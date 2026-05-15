import '../../styles/rector/RectorDashboard.css'
import { useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'

import { UserLoginContext } from "../../context/userLogin.jsx"
import { BookIcon, SchoolHatIcon, UserIcon } from "../../components/common/GeneralIcons.jsx"
import { CardActionToCreate } from '../../components/rector/CardActionToCreate.jsx'
import { CircleChart } from '../../components/common/charts/CircleChart.jsx'
import { BarChartPerformance } from '../../components/rector/BarChartPerformance.jsx'

export function RectorDashboard() {
    const navigate = useNavigate()
    const { userLogin } = useContext(UserLoginContext)
    const { setTitleHeaderOption } = useTitleHeaderOption()

    useEffect(() => {
        setTitleHeaderOption('Dashboard Rector')
    }, [])

    console.log(userLogin)

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