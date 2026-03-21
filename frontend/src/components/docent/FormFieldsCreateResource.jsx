// ==================== HOOKS ====================
import { useEffect, useRef, useState } from "react"
// ================================================

// ==================== STYLES ====================
import "../../styles/docent/FormFieldsCreateResource.css"
// ================================================

// ==================== COMPONENTS ====================
import { FileUploadIcon, SendIcon, LinkIcon } from "../common/GeneralIcons.jsx"
// ====================================================

export function FormFieldsCreateResource({ typeResource }) {
    const [infoResource, setInfoResource] = useState({
        title: '',
        category: null,
        description: '',
        files: [],
        date: null,
        hour: null,
        points: null,
        publishImmediately: false,
        lateDeliveries: false
    })

    const inputFileRef = useRef(null)

    // ESTO ES PARA CAMBIAR EL COLOR DEL BORDE DEL INPUT SEGÚN EL TIPO DE RECURSO
    useEffect(() => {
        document.querySelectorAll('.field-action').forEach(field => {
            const colorBorderForType = {
                'TA': '#34d399',
                'MA': '#60a5fa',
                'EN': '#94a3b8'
            }
            field.addEventListener('focus', () => {
                field.style.border = `2px solid ${colorBorderForType[typeResource]}`
            })
            field.addEventListener('blur', () => {
                field.style.border = '2px solid #f1f5f9'
            })
        })
    }, [typeResource])

    const handleChangeInfoResource = (e) => {
        const { name, value, type, checked } = e.target
        setInfoResource(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleChangeUploadFile = (e) => {
        const files = e.target.files
        setInfoResource(prev => ({
            ...prev,
            files: [...files]
        }))
    }

    console.log(infoResource)

    return (
        <section className="fields-form-create-resource">
            <section style={{display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap'}}>
                <div className="field">
                    <label htmlFor="title-resource">
                        TÍTULO {typeResource === 'TA' 
                        ? 'DE LA TAREA'
                        : typeResource === 'MA'
                            ? 'DEL MATERIAL'
                            : 'DEL ANUNCIO'
                    }
                    </label>
                    <input 
                        type="text" 
                        id="title-resource" 
                        name="title"
                        placeholder="EJ: Investigación sobre..."
                        className="field-action"
                        value={infoResource.title}
                        onChange={handleChangeInfoResource}
                    />
                </div>
                {typeResource === 'MA' && (
                    <div className="field">
                        <label htmlFor="category">
                            CATEGORÍA
                        </label>
                        <select 
                            name="category" 
                            id="category" 
                            className="field-action" 
                            value={infoResource.category} 
                            onChange={handleChangeInfoResource}
                            defaultValue={null}
                        >
                            <option value={null} disabled selected>Seleccionar</option>
                            <option value="A">Archivo</option>
                            <option value="L">Link</option>
                            <option value="AM">Ambos</option>
                        </select>
                    </div>
                )}
            </section>
            <div className="field">
                <label htmlFor="instructions-resource">
                    {typeResource === 'TA'
                        ? "INSTRUCCIONES"
                        : typeResource === 'MA'
                            ? "DESCRIPCIÓN DEL RECURSO"
                            : "MENSAJE"
                    }
                </label>
                <textarea 
                    id="instructions-resource"
                    placeholder={typeResource === 'TA'
                        ? "Describe los requisitos de la tarea..."
                        : typeResource === 'MA'
                            ? "Añade instrucciones o una breve descripción para tus estudiantes..."
                            : "Escribe tu mensaje aqui..."
                    }
                    className="field-action"
                    name="description"
                    value={infoResource.description}
                    onChange={handleChangeInfoResource}
                ></textarea>
            </div>
            {typeResource === 'TA' && (
                <div className="fields-dates">
                    <div className="field">
                        <label htmlFor="limit-date">
                            FECHA LIMITE
                        </label>
                        <input 
                            type="date" 
                            name="date" 
                            id="limit-date" 
                            className="field-action"
                            value={infoResource.date}
                            onChange={handleChangeInfoResource}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="hour-limit">
                            HORA
                        </label>
                        <input 
                            type="time" 
                            name="hour" 
                            id="hour-limit" 
                            className="field-action"
                            value={infoResource.hour}
                            onChange={handleChangeInfoResource}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="points">
                            PUNTAJE
                        </label>
                        <input 
                            type="number" 
                            name="points" 
                            id="points" 
                            className="field-action"
                            value={infoResource.points}
                            onChange={handleChangeInfoResource}
                        />
                    </div>
                </div>
            )}
            <div className="field">
                <label htmlFor="attachments">
                    RECURSOS ADJUNTOS
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
                <section className="container-to-upload-file">
                    {((typeResource === 'MA' && (infoResource.category === 'A' || infoResource.category === 'AM')) || typeResource === 'TA') && (
                        <div className="container-file-selected" onClick={() => inputFileRef.current.click()}>                        
                            <div className="container-icon-upload">
                                <FileUploadIcon />
                            </div>
                            <div className="container-text-upload">
                                <h2>Subir archivos complementarios</h2>
                                <p>Arrastra y suelta archivos aquí o haz clic para seleccionarlos.</p>
                            </div>
                        </div>
                    )}
                    {((typeResource === 'MA' && (infoResource.category === 'L' || infoResource.category === 'AM')) || typeResource === 'TA') && (
                        <div className="container-anchors-web">
                            <div className="container-anchor-created">
                                <h5>ENLACE WEB</h5>
                                <div className="container-anchor-inside">
                                    <div className="icon-anchor">
                                        <LinkIcon />
                                    </div>
                                    <div className="container-input-anchor">
                                        <input type="text" placeholder="Enlace web" />
                                    </div>
                                </div>
                                <button className="btn-create-anchor">Nuevo enlace</button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            {typeResource === 'TA' && (
                <section className="container-switches-options">
                    <div className="switch">
                        <div>
                            <h3>Publicar inmediatamente</h3>
                            <p>Visible para todos los estudiantes</p>
                        </div>
                        <label className="container-switch">
                            <input 
                                type="checkbox" 
                                name="publishImmediately" 
                                id="publishImmediately"
                                onChange={handleChangeInfoResource}
                                checked={infoResource.publishImmediately}

                            />
                            <span className="slider-switch"></span>
                        </label>
                    </div>
                    <div className="switch">
                        <div>
                            <h3>Entregas tardías</h3>
                            <p>Permitir envios después del plazo</p>
                        </div>
                        <label className="container-switch">
                            <input 
                                type="checkbox" 
                                name="lateDeliveries" 
                                id="lateDeliveries"
                                onChange={handleChangeInfoResource}
                                checked={infoResource.lateDeliveries}
                            />
                            <span className="slider-switch"></span>
                        </label>
                    </div>
                </section>
            )}
            <section className="container-buttons-actions">
                <button className="btn-discart">
                    Descartar
                </button>
                <button className="btn-create">
                    Crear {typeResource === 'TA' ? 'Tarea' : typeResource === 'MA' ? 'Material' : 'Anuncio'}
                    <SendIcon />
                </button>
            </section>
        </section>
    )
}