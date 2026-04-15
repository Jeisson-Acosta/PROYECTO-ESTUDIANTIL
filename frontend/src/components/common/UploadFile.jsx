import '../../styles/common/UploadFile.css'
import { useState, useRef } from "react"
import { FileUploadIcon } from "./GeneralIcons.jsx"

export function UploadFile() {

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [counterFiles, setCounterFiles] = useState(0)
    const inputFileRef = useRef(null)

    const handleChangeUploadFile = (e) => { 
        setUploadedFiles(e.target.files)
        setCounterFiles(e.target.files.length)
    }

    return (
        <section className="principal-container-to-upload-file">

            <label htmlFor="attachments" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
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
                        <div>
                            <span className='name-file'>{file.name}</span>
                        </div>
                        <div>
                            <span className='size-file'>{file.size}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>

    )
}