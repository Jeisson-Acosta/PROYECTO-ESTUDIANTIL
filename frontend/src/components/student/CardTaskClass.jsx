import { CalendarIcon, ClockIcon, EyeIcon, DownloadIcon } from "../common/GeneralIcons.jsx"
import '../../styles/student/CardTaskClass.css'

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

export function CardTaskClass({ task }) {
    return (
        <li className={`task-class ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'statement'}`}>
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
                                    <span style={{ fontFamily: 'fontSubtitles', fontSize: '24px', fontWeight: 'bold' }}>
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
               
    )
}