import '../../styles/rector/RectorDashboard.css'
import { useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'

import { UserLoginContext } from "../../context/userLogin.jsx"

import { BookIcon, SchoolHatIcon, UserIcon } from "../../components/common/GeneralIcons.jsx"
import { CardActionToCreate } from '../../components/rector/CardActionToCreate.jsx'
import { CircleChart } from '../../components/common/charts/CircleChart.jsx'
import { BarChartPerformance } from '../../components/rector/BarChartPerformance.jsx'

import { MakeTourContext } from '../../context/common/makeTour.jsx'

export function RectorDashboard() {
    const navigate = useNavigate()
    const { userLogin } = useContext(UserLoginContext)
    const { setTitleHeaderOption } = useTitleHeaderOption()
    const { startTour } = useContext(MakeTourContext)

    useEffect(() => {
        setTitleHeaderOption('Dashboard Rector')
        const stepsDiverRector = [
            { element: '.principal-container-menu', popover: { title: 'Menú principal', description: 'Aquí puedes ver el menú principal de la plataforma con todas las opciones disponibles para ti.' } },
            { element: '.dashboard-menu-option', popover: { title: 'Dashboard', description: 'Aquí podrás ver la información general de tu centro educativo y llevar el control.' } },
            { element: '.cursos-menu-option', popover: { title: 'Cursos', description: 'Aquí podrás gestionar todo lo relacionado con los cursos que se ofrecen en tu centro educativo.' } },
            { element: '.calendario-menu-option', popover: { title: 'Calendario', description: 'En esta sección podrás gestionar todo lo relacionado con el calendario académico y eventos escolares.' } },
            { element: '.reportes-menu-option', popover: { title: 'Reportes', description: 'En esta sección podrás generar los reportes que se pueden generar del sistema.' } },
            { element: '.container-cards', popover: { title: 'Acciones rápidas', description: 'Aquí puedes ver las diferentes acciones que puedes realizar para gestionar el centro educativo de manera ágil y cómoda.' } },
            { element: '.cards-stadistics', popover: { title: 'Estadísticas', description: 'Aquí podrás ver las estadísticas generales de tu centro educativo, como el rendimiento académico de los estudiantes y la asistencia.' } },
            { element: '.bar-chart-card', popover: { title: 'Rendimiento académico', description: 'Aquí podrás ver el rendimiento académico general de los estudiantes.' } },
            { element: '.assitence-card', popover: { title: 'Asistencia', description: 'Aquí podrás ver la asistencia general de los estudiantes.' } }
        ]
        if (userLogin.userInfo.usuestado === 'RE') { startTour(stepsDiverRector) }
    }, [])

    return (
        <section className="container-dashboard-rector">
            <header className="header-dashboard-rector">
                <span className="date-now">
                    {userLogin.date_now_formatted.charAt(0).toUpperCase() + userLogin.date_now_formatted.slice(1)}
                </span>
                <h1>
                    Bienvenido, Rector {userLogin.userInfo.usunom}
                </h1>
                <p className='description-header'>
                    Lleva el control del centro educativo con normalidad, desde aquí puedes ver la información de docentes, estudiantes y clases.
                </p>
            </header>
            <section className="cards-actions-to-create">
                <div>
                    <h3 style={{fontFamily: 'fontTitlesBold', margin: '0'}}>
                        Creación y Asignación
                    </h3>
                </div>
                <div className='container-cards'>
                    <CardActionToCreate 
                        bgColorIcon={'#eff6ff'}
                        classNameIcon={'docent'}
                        icon={<UserIcon />}
                        title={'Registrar Docente'}
                        description={'Añadir nuevo personal docente a la base de datos institucional.'}
                        colorTextButton={'#0f79eb'}
                        textButton={'CREAR NUEVO'}
                        onClick={() => {navigate('/rector/create-docent')}}
                    />
                    <CardActionToCreate 
                        bgColorIcon={'#ecfdf5'}
                        classNameIcon={'student'}
                        icon={<SchoolHatIcon />}
                        title={'Matricular Estudiante'}
                        description={'Ingresar nuevos alumnos y asignar grados correspondientes.'}
                        colorTextButton={'#1c9967'}
                        textButton={'MATRICULAR'}
                        onClick={() => {navigate('/rector/create-student')}}
                    />
                    <CardActionToCreate 
                        bgColorIcon={'#faf5ff'}
                        classNameIcon={'course'}
                        icon={<BookIcon />}
                        title={'Abrir Nueva Asignatura'}
                        description={'Gestionar apertura de aulas y asignación de horarios.'}
                        colorTextButton={'#9212ea'}
                        textButton={'CONFIGURAR'}
                        onClick={() => {navigate('/rector/create-course')}}
                    />
                </div>
            </section>

            <section className='cards-stadistics'>
                {userLogin.general_average !== null && (
                    <BarChartPerformance
                        generalAverage={userLogin.general_average}
                        performanceData={userLogin.general_performance_x_course}
                    />
                )}
                
                <div className="assitence-card">
                    <p className="assitence-card-title">Asistencia</p>
                    {userLogin.percentage_assitence !== null &&
                        <CircleChart 
                            endValue={100}
                            value={Number(userLogin.percentage_assitence)}
                            color={'137fec'}
                            labelCenter={'Asistencia'}
                            additionalText='%'
                            colorBlank='dbeafe'
                        />
                    }
                    {userLogin.percentage_assitence === null && (
                        <h2>No hay información de asistencia</h2>
                    )}
                </div>
            </section>

        </section>
    )
}