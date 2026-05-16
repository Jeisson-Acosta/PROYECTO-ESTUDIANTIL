import { useContext, useEffect } from 'react'

import '../../styles/docent/TeacherDashboard.css'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { MakeTourContext } from '../../context/common/makeTour.jsx'

import { PenWritingIcon, ChartAreaLineIcon, MedalFallIcon, AlertTriangleIcon, UserOffIcon, ExclamationCircleIcon, UsersIcon, BookVocabularyIcon, CheckboxIcon, SchoolHatIcon, PencilCancelIcon } from '../../components/common/GeneralIcons.jsx'
import { CardInfoDashboardTeacher } from '../../components/docent/CardInfoDashboardTeacher.jsx'
import { CardNextClass } from '../../components/docent/CardNextClass.jsx'
import { CardTaskByQualify } from '../../components/docent/CardTaskByQualify.jsx'
import { CardPerformanceCourse } from '../../components/docent/CardPerformanceCourse.jsx'

import { useLocation } from 'react-router-dom'

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
    const { startTour } = useContext(MakeTourContext)
    const location = useLocation()

    useEffect(() => {
        setUserLogin({ 
            ...userLogin,
            course_director_info: typeof userLogin.course_director_info === 'string' ? JSON.parse(userLogin.course_director_info) : userLogin.course_director_info
        })

        const stepsDiverDocent = [
            { element: '.principal-container-menu', popover: { title: 'Menú principal', description: 'Aquí puedes ver el menú principal de la plataforma con todas las opciones disponibles para ti' } },
            { element: '.dashboard-menu-option', popover: { title: 'Dashboard', description: 'Aquí podrás ver la información general de tus cursos asignados y información de utilidad para ti' } },
            { element: '.cursos-menu-option', popover: { title: 'Cursos', description: 'Aquí podrás gestionar todo lo relacionado con los cursos que te han asignado' } },
            { element: '.tareas-menu-option', popover: { title: 'Tareas', description: 'Aquí podrás gestionar el estado y calificaciones de las tareas' } },
            { element: '.notas-menu-option', popover: { title: 'Notas', description: 'Aquí podrás gestionar las notas de tus estudiantes' } },
            { element: '.calendario-menu-option', popover: { title: 'Calendario', description: 'Aquí podrás ver el calendario académico del periodo actual' } },
            { element: '.reportes-menu-option', popover: { title: 'Reportes', description: 'En esta sección podrás generar los reportes que se pueden generar del sistema.' } },
            { element: '.principal-cards-header', popover: { title: 'Información general', description: 'Aquí puedes ver la información general de tu curso' } },
            { element: '.container-general-performance-courses', popover: { title: 'Rendimiento general', description: 'Aquí puedes ver el rendimiento general de tus cursos asignados.' } },
            { element: '.next-classes', popover: { title: 'Próximas clases', description: 'Aquí puedes ver tus próximas clases del día de hoy.' } },
            { element: '.container-tasks-to-qualify', popover: { title: 'Tareas por calificar', description: 'Aquí puedes ver las tareas que tienes pendientes por calificar a tus estudiantes.' } },
            { element: '.last-actions-docent', popover: { title: 'Últimas acciones', description: 'Aquí puedes ver las últimas acciones que has realizado en la plataforma.' } },
            { element: '.performance-course', popover: { title: 'Rendimiento del curso', description: 'Aquí puedes ver el rendimiento del curso del cual eres director.' } }
        ]

        if (userLogin.userInfo.usuestado === 'RE') { startTour(stepsDiverDocent) }
    }, [location.key])

    const dateNow = new Date()
    const shortDate = dateNow.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })

    return (
        <section className="container-principal-dashboard-teacher">

            <header className='principal-cards-header'>
                <CardInfoDashboardTeacher
                    bgColor={'#e3f2fd'}
                    title={'Director de curso'}
                    principalIcon={<UsersIcon />}
                    principalValue={userLogin.course_director_info.edcnom}
                    secondIcon={<UsersIcon />}
                    secondValue={'32 estudiantes'}
                    colorTitle={'#54a5eb'}
                    colorPrincipalValue={'#1666c0'}
                 />
                <CardInfoDashboardTeacher
                    bgColor={'#e8f5e9'}
                    title={'Cursos asignados'}
                    principalIcon={<BookVocabularyIcon />}
                    principalValue={userLogin.quantity_courses_assignamed}
                    secondIcon={<BookVocabularyIcon />}
                    secondValue={'18 horas semanales'}
                    colorTitle={'#7bbd7e'}
                    colorPrincipalValue={'#2f7e33'}
                 />
                <CardInfoDashboardTeacher
                    bgColor={'#fff3e0'}
                    title={'Tareas por calificar'}
                    principalIcon={<CheckboxIcon />}
                    principalValue={userLogin.tasks_by_qualify}
                    secondIcon={<CheckboxIcon />}
                    secondValue={'No olvides calificar los trabajos pendientes'}
                    colorTitle={'#fb9d25'}
                    colorPrincipalValue={'#ef6c00'}
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
                                <h4 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>Aún no tienes cursos asignados</h4>
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
                            <SchoolHatIcon />
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
                            <h4 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>No tienes clases para hoy</h4>
                        )}
                    </div>
                </section>

                <section className="more-cards-right">
                    <div className="container-tasks-to-qualify container-section-dashboard">
                        <header className='header-tasks-to-qualify header-section-dashboard'>
                            <div className="header-left">
                                <h3 style={{fontSize: '14px'}}>Sin calificar 📝</h3>
                            </div>
                        </header>       
                        <div className="cards-tasks-by-qualify">
                            {userLogin.tasks_by_qualify_object ? JSON.parse(userLogin.tasks_by_qualify_object).map(task => (
                                <CardTaskByQualify 
                                    key={task.astid}
                                    task={task}
                                />
                            )) : (
                                <h4 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>¡Excelente! No tienes tareas pendientes por calificar.</h4>
                            )}
                        </div>  
                    </div>
                    <div className="container-section-dashboard">
                        <header className='header-requests header-section-dashboard'>
                            <div className="header-left">
                                <h3 style={{fontSize: '14px'}}>Solicitudes</h3>
                            </div>
                        </header>
                        <div>
                            <h4 style={{fontFamily: 'fontTitlesBold', color: '#64748b', textAlign: 'center'}}>¡Próximamente!</h4>
                        </div>    
                    </div>
                </section>
            </section>

            <section className="container-actions-performance-course">
                <div className="last-actions-docent container-section-dashboard">
                    <header className='header-last-actions header-section-dashboard'>
                        <div className="header-left">
                            <PenWritingIcon />
                            <h3>Últimas acciones</h3>
                        </div>
                    </header>
                </div>

                <div className="performance-course container-section-dashboard">
                    <header className='header-performance-course header-section-dashboard'>
                        <div className="header-left">
                            <ChartAreaLineIcon />
                            <h3>Rendimiento de mi curso</h3>
                        </div>
                    </header>
                    <div className="cards-performance-course">
                        <CardPerformanceCourse 
                            icon={<MedalFallIcon />}
                            smalTitle={'Mejor Estudiante'}
                            value={JSON.parse(userLogin.performance_course.best_student).usunom}
                            bgColorIcon={'#b3f7e7ff'}
                            bgColorCard={'#f0fdfa'}
                        />
                        <CardPerformanceCourse 
                            icon={<ExclamationCircleIcon />}
                            smalTitle={'Bajo rendimiento'}
                            value={JSON.parse(userLogin.performance_course.bad_student).usunom}
                            bgColorIcon={'#fcd5daff'}
                            bgColorCard={'#fbf3f4'}
                        />
                        <CardPerformanceCourse 
                            icon={<AlertTriangleIcon />}
                            smalTitle={'En Riesgo'}
                            value={userLogin.performance_course.students_in_risk}
                            bgColorIcon={'#fdf3cdff'}
                            bgColorCard={'#fffbeb'}
                        />
                        <CardPerformanceCourse 
                            icon={<UserOffIcon />}
                            smalTitle={'Inasistencias'}
                            value={userLogin.performance_course.absences_course}
                            bgColorIcon={'#e0d9ffff'}
                            bgColorCard={'#f5f3ff'}
                        />
                    </div>
                </div>
            </section>

        </section>
    )
}