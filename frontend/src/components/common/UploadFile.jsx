import '../../styles/common/UploadFile.css'
import { FileUploadIcon, PdfIcon, DocxIcon, PhotoIcon, TrashIcon } from "./GeneralIcons.jsx"

export function UploadFile({ uploadedFiles, setUploadedFiles, counterFiles, setCounterFiles, inputFileRef, handleChangeUploadFile }) {

    const deleteFile = (index) => {
        const newUploadedFiles = Array.from(uploadedFiles)
        newUploadedFiles.splice(index, 1)
        setUploadedFiles(newUploadedFiles)
        setCounterFiles(counterFiles - 1)
    }

    return (
        <section className="principal-container-to-upload-file">

            <label htmlFor="attachments" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontFamily: 'fontTitlesBold', fontSize: '14px', alignItems: 'center'}}>
                RECURSOS ADJUNTOS 
                <span className="counter-uploaded-files">Archivos subidos: {counterFiles}</span>
            </label>
            <input 
                type="file" 
                name="files" 
                id="attachments" 
                style={{display: 'none'}}
                className="field-action"
                onChange={handleChangeUploadFile}
                ref={inputFileRef}
                multiple
            />
            <div className="container-file-selected" onClick={() => inputFileRef.current.click()}>                        
                <div className="container-icon-upload">
                    <FileUploadIcon />
                </div>
                <div className="container-text-upload">
                    <h2>Subir archivos complementarios</h2>
                    <p>Arrastra y suelta archivos aquí o haz clic para seleccionarlos.</p>
                </div>
            </div>

            <ul className="list-files-uploaded">
                {uploadedFiles.length > 0 && Array.from(uploadedFiles).map((file, index) => (
                    <li key={index} className="file-item">
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <div 
                                className={`icon-resource ${file.type.includes('application/pdf') 
                                    ? 'pdf' 
                                    : file.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') 
                                        ? 'docx' 
                                        : (file.type.includes('image/jpeg') || file.type.includes('image/png') || file.type.includes('image/jpg'))
                                            ? 'photo' 
                                            : ''}`
                                }
                            >
                                {file.type.includes('application/pdf') && <PdfIcon />}
                                {file.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') && <DocxIcon />}
                                {(file.type.includes('image/jpeg') || file.type.includes('image/png') || file.type.includes('image/jpg')) && <PhotoIcon />}
                            </div>
                            <span className='name-file'>{file.name}</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <span className='size-file'>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            <button className='btn-delete-file' onClick={() => deleteFile(index)}>
                                <TrashIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>

    )
}