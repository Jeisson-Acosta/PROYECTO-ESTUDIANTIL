import { useContext, useEffect } from 'react'
import '../../styles/docent/TeacherDashboard.css'
import { UserLoginContext } from '../../context/userLogin.jsx'

import { UserNotFilledIcon, UserIcon, ChalkboardIcon, ClockIcon, BellIcon, ListCheckIcon } from '../../components/common/GeneralIcons.jsx'
import { CardInfoDashboardTeacher } from '../../components/docent/CardInfoDashboardTeacher.jsx'

export function TeacherDashboard() {
    const { userLogin, setUserLogin } = useContext(UserLoginContext)

    useEffect(() => {
        setUserLogin({ 
            ...userLogin, 
            course_director_info: JSON.parse(userLogin.course_director_info) 
        })
    }, [])

    console.log(userLogin)

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

        </section>
    )
}