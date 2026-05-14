import '../../styles/rector/FormCreateNewCourse.css'
import { useEffect, useState, useContext } from "react"
import { useTitleHeaderOption } from "../../hooks/common/useTitleHeaderOption.js"
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useNavigate } from 'react-router-dom'

import { UserLoginContext } from '../../context/userLogin.jsx'
import * as Backgrounds from '../common/BackgroundsClasses.jsx'
import * as Icons from '../common/IconsClasses.jsx'

import toast from "react-hot-toast"
import confetti from 'canvas-confetti'

const IconFileText = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const IconPalette = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const IconGraduationCap = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const IconClock = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCheck = ({ style }) => <svg style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const COLORS_TO_SELECT = ['6C63FF', '10B981', 'FF6B6B', 'F59E0B', '38BDF8', 'F43F5E', '14B8A6', '8B5CF6', 'FB923C', '84CC16']

export function FormCreateNewCourse() {
    const { setTitleHeaderOption } = useTitleHeaderOption()
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()

    const [docents, setDocents] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [courses, setCourses] = useState([])
    const [formData, setFormData] = useState({
        asgnom: '',
        asgcod: '',
        asgcod_clase: '',
        edcid: '',
        cesid: '',
        docente_id: '',
        asgmaxest: '',
        asgestado: 'A',
        ascvis_config: {
            color: '6C63FF',
            iconName: Object.keys(Icons)[0]?.replace(/^Icon/, '').replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase() || '',
            backgroundName: Object.keys(Backgrounds)[0]?.replace(/^Background/, '') || ''
        }
    })
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleConfigChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            ascvis_config: {
                ...prev.ascvis_config,
                [key]: value
            }
        }))
    }

    const autoGenerateCodeCourse = () => {
        if (formData.asgnom === '') return
        setFormData(prev => ({
            ...prev,
            asgcod: formData.asgnom.slice(0, 4).toUpperCase()
        }))
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const dataToSend = {
            usuid: String(userLogin.userInfo.usuid),
            cedid: String(userLogin.educativeCenterInfo[0].cedid),
            cecid: String(userLogin.currentCycleInfo.cecid),
            info_asignatura: {
                asgnom: formData.asgnom,
                asgcod: formData.asgcod,
                asgcod_clase: formData.asgcod_clase,
                edcid: formData.edcid,
                cesid: formData.cesid,
                docente_id: formData.docente_id,
                asgmaxest: formData.asgmaxest,
                asgestado: formData.asgestado,
                ascvis_config: {
                    color: formData.ascvis_config.color,
                    iconName: formData.ascvis_config.iconName,
                    backgroundName: formData.ascvis_config.backgroundName
                }
            }
        }
        const responseDB = await requestDB('rector/create-asignatura', 'POST', dataToSend)
        if (!responseDB.ok) return toast.error(responseDB.message)
        toast.success('Asignatura creada exitosamente')
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
        setFormData({
            asgnom: '',
            asgcod: '',
            asgcod_clase: '',
            edcid: '',
            cesid: '',
            docente_id: '',
            asgmaxest: '',
            asgestado: 'A',
            ascvis_config: {
                color: '6C63FF',
                iconName: Object.keys(Icons)[0]?.replace(/^Icon/, '').replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase() || '',
                backgroundName: Object.keys(Backgrounds)[0]?.replace(/^Background/, '') || ''
            }
        })
        navigate(-1)
        // Por el momento lo dejo asi pero despues descomentarlo cuando tenga hech los cursos.
        /* setTimeout(() => {
            navigate('/rector/courses')
        }, 2000) */
    }

    useEffect(() => {
        const getDocents = async () => {
            const response = await requestDB(`rector/info-to-create-asignature/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${userLogin.userInfo.usuid}`, 'GET')
            if (!response.ok) return toast.error(response.message)
            setDocents(JSON.parse(response.data[0].docents) ?? [])
            setClassrooms(JSON.parse(response.data[0].classrooms) ?? [])
            setCourses(JSON.parse(response.data[0].courses) ?? [])
        }
        getDocents()
        setTitleHeaderOption('Registrar nueva asignatura')
    }, [])

    return (
        <div className="form-create-new-course-wrapper">
            <form className="form-create-new-course" onSubmit={handleSubmitForm}>
                <section className="section-form">
                    <header className="header-section-form">
                        <IconFileText className="section-icon" />
                        <h3>Información General</h3>
                    </header>
                    <div className="container-form-inputs col-3">
                        <div className="input-group">
                            <label htmlFor="asgnom">Nombre de la Asignatura</label>
                            <input type="text" id="asgnom" value={formData.asgnom} onChange={handleInputChange} onBlur={autoGenerateCodeCourse} placeholder="Ej. MAT" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="asgcod">Código de la Asignatura</label>
                            <input disabled type="text" id="asgcod" value={formData.asgcod} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="asgcod_clase">Código de ingreso</label>
                            <input type="text" id="asgcod_clase" value={formData.asgcod_clase} onChange={handleInputChange} maxLength={6} placeholder="EJ. MAT-101" />
                        </div>
                    </div>
                    {/* <div className="input-group full-width" style={{marginTop: '20px'}}>
                        <label htmlFor="asgdesc">Descripción del Curso</label>
                        <textarea id="asgdesc" rows="4" value={formData.asgdesc} onChange={handleInputChange} placeholder="Ingrese una descripción detallada, objetivos y prerrequisitos del curso..."></textarea>
                    </div> */}
                </section>

                <section className="section-form">
                    <header className="header-section-form">
                        <IconPalette className="section-icon" />
                        <h3>Apariencia Visual</h3>
                    </header>
                    <div className="container-visuals">
                        <div className="visual-block">
                            <label>Fondo de Clase</label>
                            <div className="visual-selector-list">
                                {Object.keys(Backgrounds).map(bgKey => {
                                    const CurrentBackground = Backgrounds[bgKey]
                                    const bgName = bgKey.replace(/^Background/, '')
                                    return (
                                        <div 
                                            key={bgName} 
                                            className={`visual-circle-item ${formData.ascvis_config.backgroundName === bgName ? 'selected' : ''}`}
                                            onClick={() => handleConfigChange('backgroundName', bgName)}
                                        >
                                            <CurrentBackground style={{width: '100%', height: '100%'}} fill={`#${formData.ascvis_config.color}`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="visual-block">
                            <label>Avatar de Clase</label>
                            <div className="visual-selector-list">
                                {Object.keys(Icons).map(iconKey => {
                                    const CurrentIcon = Icons[iconKey]
                                    const iconName = iconKey.replace(/^Icon/, '').replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase()
                                    return (
                                        <div 
                                            key={iconName} 
                                            className={`visual-circle-item ${formData.ascvis_config.iconName === iconName ? 'selected' : ''}`}
                                            onClick={() => handleConfigChange('iconName', iconName)}
                                        >
                                            <CurrentIcon style={{width: '60%', height: '60%'}} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="visual-block">
                            <label>Color Principal</label>
                            <div className="visual-selector-list">
                                {COLORS_TO_SELECT.map(color => (
                                    <div
                                        key={color}
                                        className={`visual-circle-color ${formData.ascvis_config.color === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: `#${color}` }}
                                        onClick={() => handleConfigChange('color', color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section> 

                <section className="section-form">
                    <header className="header-section-form">
                        <IconGraduationCap className="section-icon" />
                        <h3>Asignación y Logística</h3>
                    </header>
                    <div className="container-form-inputs col-3">
                        <div className="input-group">
                            <label htmlFor="edcid">Curso</label>
                            <select id="edcid" value={formData.edcid} onChange={handleInputChange}>
                                <option value="" selected disabled>Seleccionar curso...</option>
                                {courses.map(course => (
                                    <option key={course.edcid} value={course.edcid}>{course.edcnom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="docente_id">Docente Asignado</label>
                            <select id="docente_id" value={formData.docente_id} onChange={handleInputChange}>
                                <option value="" selected disabled>Seleccionar docente...</option>
                                {docents.map(docent => (
                                    <option key={docent.usuid} value={docent.usuid}>{docent.usunom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="cesid">Salón</label>
                            <select id="cesid" value={formData.cesid} onChange={handleInputChange}>
                                <option value="" selected disabled>Seleccionar salón...</option>
                                {classrooms.map(classroom => (
                                    <option key={classroom.cesid} value={classroom.cesid}>{classroom.cesnom}</option>
                                ))}
                            </select>
                        </div>
                        {/* <div className="input-group">
                            <label htmlFor="periodo">Periodo Académico</label>
                            <select id="periodo" value={formData.periodo} onChange={handleInputChange}>
                                <option value="">Seleccionar periodo...</option>
                                <option value="2024-1">2024 - I</option>
                            </select>
                        </div>*/}
                        <div className="input-group">
                            <label htmlFor="asgmaxest">Capacidad de Estudiantes</label>
                            <input type="text" id="asgmaxest" value={formData.asgmaxest} onChange={handleInputChange} placeholder="EJ: 30" />
                        </div>
                    </div>
                </section>

                <section className="section-form">
                    <header className="header-section-form">
                        <IconClock className="section-icon" />
                        <h3>Cronograma y Estado</h3>
                    </header>
                    <div className="container-form-inputs col-3">
                        {/* <div className="input-group">
                            <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                            <input type="date" id="fecha_inicio" value={formData.fecha_inicio} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="fecha_fin">Fecha de Fin</label>
                            <input type="date" id="fecha_fin" value={formData.fecha_fin} onChange={handleInputChange} />
                        </div> */}
                        <div className="input-group">
                            <label>Estado del Curso</label>
                            <div className="buttons-status">
                                <button type="button" className={`status-btn ${formData.asgestado === 'A' ? 'active-status' : ''}`} onClick={() => handleInputChange({target: {id: 'asgestado', value: 'A'}})}>
                                    <span className="dot dot-green"></span> Activo
                                </button>
                                <button type="button" className={`status-btn ${formData.asgestado === 'I' ? 'active-status' : ''}`} onClick={() => handleInputChange({target: {id: 'asgestado', value: 'I'}})}>
                                    <span className="dot dot-gray"></span> Inactivo
                                </button>
                            </div>
                            <span className="status-help">El estado determina si el curso es visible para los estudiantes.</span>
                        </div>
                    </div>
                </section>

                <div className="form-actions">
                    <button type="button" className="btn-cancel">Cancelar</button>
                    <button type="submit" className="btn-submit">
                        <IconCheck style={{marginRight: '8px'}} /> Registrar Curso
                    </button>
                </div>
            </form>
        </div>
    )
}