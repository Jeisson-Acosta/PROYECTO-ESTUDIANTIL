import { useContext, useEffect } from 'react'
import '../../styles/docent/TeacherDashboard.css'
import { UserLoginContext } from '../../context/userLogin.jsx'

import { UserNotFilledIcon, UserIcon, ChalkboardIcon, ClockIcon, BellIcon, ListCheckIcon } from '../../components/common/GeneralIcons.jsx'
import { CardInfoDashboardTeacher } from '../../components/docent/CardInfoDashboardTeacher.jsx'
import { CardNextClass } from '../../components/docent/CardNextClass.jsx'

function BarGraph({ value, label }) {
    return (
        <div className="bars-wrapper" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '180px', marginTop: '26px' }}>
            <div className="bar">
                <div 
                    className="graph-bar-background"
                    style={{
                        backgroundColor: value >= 70 ? '#d1fae5' : value >= 50 ? '#fef9c3' : '#fee2e2'
                    }}
                >
                    <div 
                        className="graph-bar-fill" 
                        style={{ 
                            height: `${value}%`,
                            backgroundColor: value >= 70 ? '#10b981' : value >= 50 ? '#facc15' : '#ef4444' 
                        }}
                    >
                    </div>
                </div>
                <span className="bar-label">
                    {label}
                </span>
            </div>
        </div>
    )
}

export function TeacherDashboard() {
    const { userLogin, setUserLogin } = useContext(UserLoginContext)

    useEffect(() => {
        setUserLogin({ 
            ...userLogin, 
            course_director_info: JSON.parse(userLogin.course_director_info)
        })
    }, [])

    const dateNow = new Date()
    const shortDate = dateNow.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })

    return (
        <section className="container-principal-dashboard-teacher">

            <header className='principal-cards-header'>
                <CardInfoDashboardTeacher
                    bgColor={'#283548'}
                    title={'Director de curso'}
                    principalIcon={<UserIcon />}
                    principalValue={userLogin.course_director_info.edcnom}
                    secondIcon={<UserNotFilledIcon />}
                    secondValue={'32 estudiantes'}
                 />
                <CardInfoDashboardTeacher
                    bgColor={'#0992a5'}
                    title={'Cursos asignados'}
                    principalIcon={<ChalkboardIcon />}
                    principalValue={userLogin.quantity_courses_assignamed}
                    secondIcon={<ClockIcon />}
                    secondValue={'18 horas semanales'}
                 />
                <CardInfoDashboardTeacher
                    bgColor={'#f97f18'}
                    title={'Tareas por calificar'}
                    principalIcon={<ListCheckIcon />}
                    principalValue={userLogin.tasks_by_qualify}
                    secondIcon={<BellIcon />}
                    secondValue={'No olvides calificar los trabajos pendientes'}
                 />
            </header>

            <section className="principal-container-main-dashboard-docent">

                <section className="container-general-performance-courses container-section-dashboard">
                    <header className='header-container-general-performance-courses header-section-dashboard'>
                        <div className="header-left">
                            <h3>Rendimiento general</h3>
                            <span className="live-badge">En vivo 🚀</span>
                        </div>
                    </header>
                    <div className="graph-container">
                        <section className="graphs-container">
                            {userLogin.general_performance_x_course ? JSON.parse(userLogin.general_performance_x_course).map(item => (
                                <BarGraph 
                                    key={item.edcid}
                                    value={item.promedio}
                                    label={item.edcnom}
                                />
                            )) : (
                                <h2 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>Aún no tienes cursos asignados</h2>
                            )}
                        </section>
                        <footer className='footer-graph-descriptions'>
                            <div className='item-decription'>
                                <div className="circle" style={{backgroundColor: '#10b981'}}></div>
                                <span>Alto</span>
                            </div>
                            <div className='item-decription'>
                                <div className="circle" style={{backgroundColor: '#facc15'}}></div>
                                <span>Promedio</span>
                            </div>
                            <div className='item-decription'>
                                <div className="circle" style={{backgroundColor: '#ef4444'}}></div>
                                <span>Bajo</span>
                            </div>
                        </footer>
                    </div>
                </section>

                <section className="next-classes container-section-dashboard">
                    <header className='header-next-classes header-section-dashboard'>
                        <div className="header-left">
                            <h3>Clases de hoy</h3>
                        </div>
                        <span className="date-today">{shortDate}</span>
                    </header>
                    <div className="cards-next-classes">
                        {userLogin.today_classes ? JSON.parse(userLogin.today_classes).map(item => (
                            <CardNextClass 
                                key={item.ashid}
                                itemClass={item}
                            />
                        )) : (
                            <h2 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>No tienes clases para hoy</h2>
                        )}
                    </div>
                </section>

                <section className="more-cards-right">
                    <div className="container-tasks-to-qualify container-section-dashboard">
                        <header className='header-tasks-to-qualify header-section-dashboard'>
                            <div className="header-left">
                                <h3 style={{fontSize: '14px'}}>Sin calificar</h3>
                            </div>
                        </header>       
                        <div className="cards-tasks-by-qualify">
                            {userLogin.tasks_by_qualify_object ? JSON.parse(userLogin.tasks_by_qualify_object).map(task => (
                                <div className="card-by-qualify">
                                    <header>
                                        <h4 className='title-task-by-qualify'>
                                            {task.astnomtrabajo}
                                        </h4>
                                        <button>
                                            Ver
                                        </button>
                                    </header>
                                    <div className="info-task-by-qualify">
                                        <span>
                                            Fecha ent: {task.atefec_entrega}
                                        </span>
                                        <span>
                                            Curso: {task.edcnom}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <h2 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>¡Excelente! No tienes tareas pendientes por calificar.</h2>
                            )}
                        </div>  
                    </div>
                    <div className="container-section-dashboard">
                        <header className='header-requests header-section-dashboard'>
                            <div className="header-left">
                                <h3 style={{fontSize: '14px'}}>Solicitudes</h3>
                            </div>
                        </header>         
                    </div>
                </section>

            </section>

        </section>
    )
}