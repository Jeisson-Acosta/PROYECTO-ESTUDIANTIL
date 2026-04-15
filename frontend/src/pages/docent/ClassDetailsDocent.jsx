import '../../styles/docent/ClassDetailsDocent.css'
import { useState } from 'react'
import { HeaderClass } from "../../components/common/classes/HeaderClass"
import { ButtonCommon } from '../../components/common/ButtonCommon'
import { BookIcon, ClipboardCheckIcon, PlusIcon, SpeakerPhone, UserCheckIcon, UsersIcon } from '../../components/common/GeneralIcons'
import { CircleChart } from '../../components/common/charts/CircleChart'
import { CardTaskDetailsDocent } from '../../components/docent/CardTaskDetailsDocent'
import { MenuCreateResource } from '../../components/docent/MenuCreateResource.jsx'
// ======================================== HOOKS =========================================
import { useClassDetailsDocent } from '../../hooks/docent/useClassDetailsDocent.js'
import { useNavigate } from 'react-router-dom'
// ========================================================================================

export function ClassDetailsDocent() {
    const [showMenuCreate, setShowMenuCreate] = useState(false)
    const { infoClass, filter, filterListTasks, handleClickButtonFilter } = useClassDetailsDocent()
    const navigate = useNavigate()
    const currentPath = location.pathname

    if (infoClass.infoClass === null) return <h2>No tienes clases asignadas</h2>

    const handleClickButtonCreate = () => { setShowMenuCreate(!showMenuCreate) }

    return (
        <section className="container-class-details-docent">
            {infoClass.infoClass === null ? (
                <h2>La clase no ha sido encontrada</h2>
            ) : (
                <>
                    <HeaderClass infoClass={infoClass.infoClass[0]} />
                    <section className='content-class-details-docent'>
                        <div className="content-left-class-details-docent">
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <h3 style={{ fontFamily: 'fontSubtitles' }}>Contenido</h3>
                                    <span className='quantity-items-list'>{infoClass.listTasks.length} items</span>
                                </div>
                                <div className="buttons-actions" style={{display: 'flex', flexWrap: 'wrap'}}>
                                    <div style={{position: 'relative'}}>
                                        <ButtonCommon icon={<PlusIcon />} text={'Crear'} colorText='ffffff' onClick={handleClickButtonCreate} />
                                        {showMenuCreate && <MenuCreateResource onClose={() => setShowMenuCreate(false)} />}
                                    </div>
                                    <div className="buttons-filters">
                                        <button onClick={() => handleClickButtonFilter('all')} className={filter === 'all' ? 'active' : ''}>Todo</button>
                                        <button onClick={() => handleClickButtonFilter('TA')} className={filter === 'TA' ? 'active' : ''}>Tareas</button>
                                        <button onClick={() => handleClickButtonFilter('MA')} className={filter === 'MA' ? 'active' : ''}>Material</button>
                                        <button onClick={() => handleClickButtonFilter('EN')} className={filter === 'EN' ? 'active' : ''}>Enunciado</button>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-tasks-class-docent">
                                {filterListTasks.length > 0 
                                    ? filterListTasks.map(task => (<CardTaskDetailsDocent key={task.astid} task={task} />))
                                    : infoClass.listTasks.map(task => (<CardTaskDetailsDocent key={task.astid} task={task} />))
                                }
                            </ul>
                        </div>
                        <div className="content-right-class-details-docent">
                            <section className="buttons-asist-students">
                                <button className='button-asist'>
                                    <UserCheckIcon />
                                    Asistencia
                                </button>
                                <button className='button-students' onClick={() => navigate(`${currentPath}/students`)}>
                                    <UsersIcon />
                                    Estudiantes
                                </button>
                            </section>
                            <section className="chart-progress-class">
                                <h4>Progreso de la asignatura</h4>
                                <CircleChart 
                                    endValue={100} 
                                    value={infoClass.progress} 
                                    color={"0ea5e9"}
                                    additionalText='%'
                                />
                                <p style={{color: '#8c919c', fontSize: '14px', textAlign: 'center'}}>
                                    No olvides recordarle a tus estudiantes entregar su tarea
                                </p>
                            </section>
                        </div>
                    </section>
                </>
            )}
        </section>
    )
}