import '../../styles/docent/CardTaskDetailsDocent.css'
import { ClipboardCheckIcon, EyeBlueIcon, DownloadIcon, BellIcon, BookIcon, SpeakerPhone } from "../common/GeneralIcons.jsx"
import { useNavigate, useLocation } from 'react-router-dom'

export function CardTaskDetailsDocent({ task }) {

    const navigate = useNavigate()
    const location = useLocation()

    const handleClickViewDetailsTask = ({ astid }) => {
        navigate(`${location.pathname}/view-details-task/${astid}`)
    }

    return (
        <li className={`card-task-details-docent ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'announcement'}`}>
            <div className="content-left-card-task">
                <div className={`icon-task ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'announcement'}`}>
                    {task.asttip === 'TA'
                        ? <ClipboardCheckIcon />
                        : task.asttip === 'MA'
                            ? <BookIcon />
                            : <SpeakerPhone />
                    }
                </div>
                <header className="info-task">
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                        <h4 className={`title-type-task ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'announcement'}`}>
                            {task.asttip === 'TA' ? 'TAREA' : task.asttip === 'MA' ? 'MATERIAL' : 'ENUNCIADO'}
                        </h4>
                        {task.asttip === 'TA' && (
                            <span style={{fontSize: '13px', color: '#7a808d'}}>Entrega: {task.astfecfin}</span>
                        )}
                    </div>
                    <h2 className='title-task'>{task.astnomtrabajo}</h2>
                    <span style={{fontSize: '13px', color: '#7a808d'}}>Publicado: {task.astfecini}</span>
                </header>
            </div>
            <div className="content-right-card-task">
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    {task.asttip === 'TA' && (
                        <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399'}}></div>
                    )}
                    <span style={{fontSize: '14px'}}>{task.total_entregas}</span>
                </div>
                <button style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>
                    <BellIcon />
                </button>
                {(task.asttip === 'TA' || task.asttip === 'EN') && (
                    <button className='button-action-task show' onClick={() => handleClickViewDetailsTask({ astid: task.astid })}>
                        Ver
                        <EyeBlueIcon />
                    </button>
                )}
                {task.asttip === 'MA' && (
                    <button className='button-action-task download'>
                        Descargar
                        <DownloadIcon />
                    </button>
                )}
            </div>
        </li>
        
    )
}
    