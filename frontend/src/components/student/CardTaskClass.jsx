import { DownloadIcon, ClipboardCheckIcon, BookIcon, SpeakerPhone, EyeBlueIcon } from "../common/GeneralIcons.jsx"
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
                <div className={`container-icon ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'announcement'}`}>
                    {task.asttip === 'TA' &&  <ClipboardCheckIcon />}
                    {task.asttip === 'MA' &&  <BookIcon />}
                    {task.asttip === 'EN' &&  <SpeakerPhone />}
                </div>
                <div className="all-info-task" style={{width: '100%'}}>
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                        <span style={{fontWeight: 'bold', fontSize: '12px', fontFamily: 'fontTitlesBold', color: task.asttip === 'TA' ? '#36ab86' : task.asttip === 'MA' ? '#4378ed' : '#7d8a9e'}}>
                            {task.asttip === 'TA' && 'TAREA'}
                            {task.asttip === 'MA' && 'MATERIAL'}
                            {task.asttip === 'EN' && 'ENUNCIADO'}
                        </span>
                        {task.asttip === 'TA' && (
                            <span style={{fontWeight: 'bold', fontSize: '13px', color: '#a1a5ae'}}>
                                Entregado: {task.atefec_entrega ? formatDate(task.atefec_entrega) : '-'}
                            </span>
                        )}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div>
                            <h3 className='title-task'>{task.asntnomtrabajo}</h3>
                            <span style={{fontWeight: 'bold', fontSize: '13px', color: '#a1a5ae'}}>
                                Publicado: {formatDate(task.astfecini)}
                            </span>  
                        </div>
                        <button className={`btn-task-class ${(task.asttip === 'TA' || task.asttip === 'EN') ? 'show' : 'download'}`}>
                            {task.asttip === 'TA' && (
                                <>
                                    Ver
                                    <EyeBlueIcon />
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
                                    <EyeBlueIcon />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </li>
               
    )
}