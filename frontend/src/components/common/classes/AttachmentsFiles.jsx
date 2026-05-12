import { DocxIcon, DownloadIcon, ExternalLinkIcon, PdfIcon, PhotoIcon } from "../GeneralIcons.jsx"
import { IconLinkRecourse } from "../IconsContenidoClase.jsx"
import '../../../styles/common/classes/AttachmentsFiles.css'

export function AttachmentsFiles({ resources }) {

    const handleClickResource = (resource) => {

        console.log(resource)

        if (resource.atrtiprec === 'L') {
            window.open(resource.value_resource, '_blank')
        }
        
    }

    return (
        <div className="resources-list">
            {resources?.map(resource => {
                return (
                    <button className="button-resource" key={resource.atrid} onClick={() => handleClickResource(resource)}>
                        <div 
                            className={`icon-resource ${resource.atrtiprec === 'L' ? 'icon-link' : 
                                resource.value_resource.includes('.pdf') ? 'icon-pdf' : 
                                resource.value_resource.includes('.docx') ? 'icon-docx' : 
                                (resource.value_resource.includes('.png') || resource.value_resource.includes('.jpg') || resource.value_resource.includes('.jpeg')) ? 'icon-photo' : ''}`
                            }
                            style={{
                                backgroundColor: (
                                resource.atrtiprec === 'L' ? '#dcfce7' :
                                resource.atrtiprec === 'A' && resource.value_resource.includes('.pdf') ? '#fee2e2' :
                                resource.atrtiprec === 'A' && resource.value_resource.includes('.docx') ? '#dbeafe' :
                                resource.atrtiprec === 'A' && (resource.value_resource.includes('.png') || resource.value_resource.includes('.jpg') || resource.value_resource.includes('.jpeg')) ? '#fef5e6' : '#fee2e2'
                                )
                            }}
                        >
                            {resource.atrtiprec === 'L' && <IconLinkRecourse />}
                            {resource.value_resource.includes('.pdf') && <PdfIcon />}
                            {resource.value_resource.includes('.docx') && <DocxIcon />}
                            {(resource.value_resource.includes('.png') || resource.value_resource.includes('.jpg') || resource.value_resource.includes('.jpeg')) && <PhotoIcon />}
                        </div>
                        <div className="info-resource-button">
                        <h4 className='name-resource'>
                            {resource.value_resource}
                        </h4>
                        <span className="type-source-description">
                            {resource.atrtiprec === 'L' && 'Enlace web'}
                            {resource.value_resource.includes('.pdf') && 'Documento PDF'}
                            {resource.value_resource.includes('.docx') && 'Documento Word'}
                            {(resource.value_resource.includes('.png') || resource.value_resource.includes('.jpg') || resource.value_resource.includes('.jpeg')) && 'Imagen'}
                        </span>
                        </div>
                        <div className="icon-representational-by-type">
                            {resource.atrtiprec === 'A' && <DownloadIcon />}
                            {resource.atrtiprec === 'L' && <ExternalLinkIcon />}
                        </div>
                    </button>
                )
            })}
        </div>

    )
}