import '../../styles/docent/ClassDetailsDocent.css'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRequestDB } from "../../hooks/utils/useRequestDB"
import toast from "react-hot-toast"
import { HeaderClass } from "../../components/common/classes/HeaderClass"
import { ButtonCommon } from '../../components/common/ButtonCommon'
import { BellIcon, ClipboardCheckIcon, EyeIcon, PlusIcon, SpeakerPhone, UserCheckIcon, UsersIcon } from '../../components/common/GeneralIcons'
import { CircleChart } from '../../components/common/charts/CircleChart'

export function ClassDetailsDocent() {
    const [infoClass, setInfoClass] = useState({ infoClass: null, listTasks: null, progress: null })
    const { requestDB } = useRequestDB()
    const { asgcod } = useParams()

    useEffect(() => {
        const getInfoClass = async () => {
            const response = await requestDB(`docent/classes/details/${asgcod}`)
            if (!response.ok) return toast.error(response.message)
            setInfoClass({
                infoClass: JSON.parse(response.data[0].info_asignatura),
                listTasks: JSON.parse(response.data[0].lista_trabajos),
                progress: response.data[0].progreso_asignatura
            })
        }
        getInfoClass()
    }, [])

    if (infoClass.infoClass === null) return <h2>No tienes clases asignadas</h2>

    return (
        <section className="container-class-details-docent">
            {infoClass.infoClass === null ? (
                <h2>La clase no ha sido encontrada</h2>
            ) : (
                <>
                    <HeaderClass infoClass={infoClass.infoClass[0]} />
                    <section className='content-class-details-docent'>
                        <div className="content-left-class-details-docent">
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <h3 style={{ fontFamily: 'fontSubtitles' }}>Contenido</h3>
                                <span className='quantity-items-list'>{infoClass.listTasks.length} items</span>
                            </div>
                            <div className="buttons-actions">
                                <ButtonCommon icon={<PlusIcon />} text={'Crear'} colorText='ffffff' />
                                <div className="buttons-filters">
                                    <button className="active">Todo</button>
                                    <button>Tareas</button>
                                    <button>Material</button>
                                </div>
                            </div>
                            <ul className="list-tasks-class-docent">
                                {infoClass.listTasks.map(task => (
                                    <li key={task.astid} className='card-task-details-docent'>
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
                                                <div>
                                                    <h4 className={`title-type-task ${task.asttip === 'TA' ? 'task' : task.asttip === 'MA' ? 'material' : 'announcement'}`}>
                                                        {task.asttip === 'TA' ? 'TAREA' : task.asttip === 'MA' ? 'MATERIAL' : 'ENUNCIADO'}
                                                    </h4>
                                                    <span>Entrega: {task.astfecfin}</span>
                                                </div>
                                                <h2 className='title-task'>{task.astnomtrabajo}</h2>
                                                <span>Publicado: {task.astfecini}</span>
                                            </header>
                                        </div>
                                        <div className="content-right-card-task">
                                            <span className='circle-green'></span>
                                            <span>{task.total_entregas}</span>
                                            <BellIcon />
                                            <button>
                                                Ver
                                                <EyeIcon />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="content-right-class-details-docent">
                            <section className="buttons-asist-students">
                                <button>
                                    <UserCheckIcon />
                                    Asistencia
                                </button>
                                <button>
                                    <UsersIcon />
                                    Estudiantes
                                </button>
                            </section>
                            <section className="chart-progress-class">
                                <h3>Progreso del curso</h3>
                                <CircleChart 
                                    endValue={100} 
                                    value={infoClass.progress} 
                                    color={"0ea5e9"}
                                    additionalText='%'
                                />
                            </section>
                        </div>
                    </section>
                </>
            )}
        </section>
    )
}