// ==================== HOOKS ====================
import { useEffect, useState, useContext } from "react"
import { useUploadFile } from "../../hooks/common/useUploadFile.js"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { UserLoginContext } from "../../context/userLogin.jsx"
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
// ================================================

// ==================== STYLES ====================
import "../../styles/docent/FormFieldsCreateResource.css"
// ================================================

// ==================== COMPONENTS ====================
import { SendIcon, LinkIcon } from "../common/GeneralIcons.jsx"
import { UploadFile } from "../common/UploadFile.jsx"
// ====================================================
import confetti from "canvas-confetti"

export function FormFieldsCreateResource({ typeResource }) {
    const [infoResource, setInfoResource] = useState({
        typeResource,
        title: '',
        category: null,
        description: '',
        files: [],
        // dateInitial: null,
        dateFinal: '',
        // hour: null,
        points: '',
        publishImmediately: false,
        lateDeliveries: false
    })

    const { requestDB } = useRequestDB()
    const navigate = useNavigate()
    const { currentClass } = useCurrentClass()
    const { userLogin } = useContext(UserLoginContext)
    const { uploadedFiles, inputFileRef } = useUploadFile()

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

    const formatDatetime = (date = new Date()) => {
        const pad = (n) => String(n).padStart(2, '0')
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    }

    const handleClickCreateResource = async () => {
        const formData = new FormData()

        // Campos de texto e información del recurso
        formData.append('usuid', userLogin.userInfo.usuid)
        formData.append('typeResource', infoResource.typeResource)
        formData.append('title', infoResource.title)
        formData.append('description', infoResource.description)

        formData.append('dateInitial', formatDatetime())
        formData.append('dateFinal', infoResource.dateFinal ? formatDatetime(new Date(infoResource.dateFinal)) : '')
        // formData.append('hour', infoResource.hour ?? '')
        formData.append('points', infoResource.points ?? '')
        // Los booleanos se envían como strings "true"/"false" (FormData no soporta boolean)
        formData.append('publishImmediately', String(infoResource.publishImmediately))
        formData.append('lateDeliveries', String(infoResource.lateDeliveries))

        // Centro educativo ANTES de los archivos (multer lo necesita en destination callback)
        formData.append('cednom', 'Manuelita Saenz')

        // Archivos adjuntos
        uploadedFiles.forEach(file => { formData.append('files', file) })

        const responseDB = await requestDB('docent/create-resource', 'POST', formData)
        if (!responseDB.ok) return toast.error(responseDB.message)

        if (typeResource === 'TA') {
            toast.success('¡Tarea creada exitosamente!')
        } else if (typeResource === 'MA') {
            toast.success('¡Material creado exitosamente!')
        } else if (typeResource === 'EN') {
            toast.success('¡Anuncio creado exitosamente!')
        }
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })

        setInfoResource({
            typeResource,
            title: '',
            category: null,
            description: '',
            // files: [],
            // dateInitial: null,
            dateFinal: '',
            // hour: null,
            points: '',
            publishImmediately: false,
            lateDeliveries: false
        })

        if (inputFileRef.current) inputFileRef.current.value = ''

        if (currentClass?.asgcod) {
            navigate(`/docent/cursos/${currentClass.asgcod}`)
        } else {
            navigate('/docent/cursos')
        }
    }

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
                            type="datetime-local" 
                            name="dateFinal" 
                            id="limit-date" 
                            className="field-action"
                            value={infoResource.dateFinal}
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
                <section className="container-to-upload-file">
                    {((typeResource === 'MA' && (infoResource.category === 'A' || infoResource.category === 'AM')) || typeResource === 'TA') && (
                        <UploadFile />
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
                <button className="btn-create" onClick={handleClickCreateResource}>
                    Crear {typeResource === 'TA' ? 'Tarea' : typeResource === 'MA' ? 'Material' : 'Anuncio'}
                    <SendIcon />
                </button>
            </section>
        </section>
    )
}