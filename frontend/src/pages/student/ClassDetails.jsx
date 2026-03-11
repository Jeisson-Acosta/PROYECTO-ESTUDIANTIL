import '../../styles/student/ClassDetails.css'
import { useEffect, useState } from "react"

import { UserNotFilledIcon, ClockIcon, EyeIcon, DownloadIcon, CalendarIcon, CircleCheckIcon, BellRingingIcon, BookIcon, SpeakerPhone } from '../../components/common/GeneralIcons.jsx'

import * as Background from '../../components/common/BackgroundsClasses.jsx'

import { getIconUrl } from "../../utils/getIconUrl.js"
import { hexToRgba } from '../../utils/hexToRgba.js'

import { useParams } from "react-router-dom"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import toast from "react-hot-toast"

const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

export function ClassDetails() {
    const [infoClass, setInfoClass] = useState({ info: null, tasks: null })
    const { requestDB } = useRequestDB()
    const { asgcod } = useParams()

    useEffect(() => {
        const getInfoClass = async () => {
            const responseDB = await requestDB(`student/class/${asgcod}`, 'GET')
            if (!responseDB.ok) return toast.error(responseDB.message)
            setInfoClass({
                info: JSON.parse(responseDB.data[0].info_asignatura),
                tasks: JSON.parse(responseDB.data[0].tasks_asignatura)
            })
        }
        getInfoClass()
    }, [])
    
    if (infoClass.info === null || infoClass.tasks === null) return null

    const BackgroundComponent = Background['Background' + infoClass.info[0].ascvis_config.backgroundName]
    const buttonsToFilter = {
        C: { title: 'Calificados', icon: <CircleCheckIcon /> },
        P: { title: 'Pendientes', icon: <BellRingingIcon />, num: 1 },
        MA: { title: 'Material', icon: <BookIcon /> },
        EN: { title: 'Enunciados', icon: <SpeakerPhone /> }

    }

    return (
        <section className="container-class">
            <header className="header-class">
                <div className="background-wrapper">
                    {BackgroundComponent && <BackgroundComponent />}
                </div>
                <div className="icon-class-header">
                    <img src={getIconUrl(infoClass.info[0].ascvis_config.iconName)} alt="Icono de clase" width="220px" height="160px" />
                </div>
                <div className="code-class" style={{backgroundColor: hexToRgba(infoClass.info[0].ascvis_config.color) }}>
                    {infoClass.info[0].asgcod_clase}
                </div>
                <div className="info-class">
                    <h1 className='title-class'>{infoClass.info[0].asgnom}</h1>
                    <div className="info-complement-class">
                        <p className='teacher-class'>
                            <UserNotFilledIcon />
                            Prof. {infoClass.info[0].usunom}
                        </p>
                        <p className='classroom-class'>
                            <ClockIcon />
                            Lun, Mie 10:00 - 11:30 AM
                        </p>
                    </div>
                </div>
            </header>
            <section className="buttons-to-filter">
                {Object.entries(buttonsToFilter).map(([key, value]) => (
                    <button key={key} className="button-filter">
                        {value.icon}
                        {value.title}
                        {value.num && <span className="num-filter">{value.num}</span>}
                    </button>
                ))}
            </section>
            <ul className="tasks-class-list">
                {infoClass.tasks.length === 0 && <h1>Aún no hay trabajos</h1>}
                {infoClass.tasks.map(task => (
                    <li key={task.astid} className={`task-class ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'statement'}`}>
                        {task.asttip === 'TA' && (
                            <div className={`status-task ${task.ateestado === 'P' ? 'task-pending' : 'task-qualified'}`}>
                                {task.ateestado_text}
                            </div>
                        )}
                        <div className="info-task">
                            <h3 className='title-task'>{task.asntnomtrabajo}</h3>
                            <p className='description-task'>{task.astdesctrabajo}</p>
                            <div className="container-dates-task">
                                {task.asttip === 'TA' && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="dates-task">
                                            <span>
                                               <CalendarIcon /> Pub: {formatDate(task.astfecini)}
                                            </span>
                                            <span className='delivery-date'>
                                               <ClockIcon /> Entrega: {formatDate(task.astfecfin)}
                                            </span>
                                        </div>
                                        {task.ateestado === 'C' && (
                                            <div className="qualifying-task" style={{ textAlign: 'center' }}>
                                                <h3 style={{ fontFamily: 'fontSubtitles', fontSize: '18px', color: '#9fa6b2' }}>Puntaje</h3>
                                                <span style={{ fontFamily: 'fontSubtitles', fontSize: '28px', fontWeight: 'bold' }}>
                                                    {task.atccalificacion}
                                                </span> 
                                                <span style={{ fontFamily: 'fontSubttitles', fontSize: '18px', color: '#9fa6b2' }}> / 5</span> {/* CHANGE THIS FOR REAL INFO */}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {task.asttip !== 'TA' && (
                                    <div className="dates-task">
                                        <span>
                                            Pub: {task.astfecini}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <footer className='footer-task'>
                            <button>
                                {task.asttip === 'TA' && (
                                    <>
                                        Ver detalles
                                        <EyeIcon />
                                    </>
                                )}
                                {task.asttip === 'MA' && (
                                    <>
                                        Descargar
                                        <DownloadIcon />
                                    </>
                                )}
                                {task.asttip === 'EN' && (
                                    <>
                                        Ver
                                        <EyeIcon />
                                    </>
                                )}
                            </button>
                        </footer>
                    </li>
                ))}
            </ul>
        </section>
    )
}