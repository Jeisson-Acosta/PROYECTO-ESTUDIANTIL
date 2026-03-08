// common/Stats.jsx
import  { useContext } from 'react'
import '../../styles/common/Dashboard.css'
import { StudentCard } from '../../components/student/StudentCard.jsx'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { MateriasCard } from '../../components/student/MateriasCard.jsx'
import {IconStar,IconAsistance} from '../../components/common/IconsLayout.jsx'
import { NotasCard } from '../../components/student/NotasCard.jsx'
export function StudentDashboard() {
    const { userLogin } = useContext(UserLoginContext) || {};
    

   // const total_materias = userLogin.total_materias;
    //const promedio = userLogin.promedio;
    //const total_inasistencias = userLogin.total_inasistencias;


    return (
        <div className="principal-content">
            <div className='stats-dashboard'>
                  <StudentCard titulo="Materias Inscritas" valor={userLogin?.total_materias || 2} adicional="+2 en el ciclo" />
            <StudentCard titulo="Promedio Estudiante" valor={userLogin?.promedio || 4.8} adicional="top 5 en la clase" Icono={IconStar} />
            <StudentCard titulo="Inasistencias" valor={userLogin?.total_inasistencias || 2} adicional="98% de asistencia" Icono= {IconAsistance} />
            </div>
            <div className='stats-dashboard'>
            <div className="materias-seccion">
            <div className='title-section'>
                   <h3 className='title'>Proximas Clases</h3>
                   <h3 className='dia'>HOY</h3>
            </div>
         
            <MateriasCard titulo="Ciencias" aula="Aula 1" hora="10:00"  profesor="Profesor 1" />
            <MateriasCard titulo="Matematicas" aula="Aula 2" hora="11:00"  profesor="Profesor 2" />
            </div>
        <div className='notas-seccion'>
        <div className='title-section'>
            <h3 className='title'>Ultimas Notas</h3>
            <h3 className='title-more'>Ver mas</h3>
        </div>
        <NotasCard titulo="Ciencias" tarea ="Dibujar la mitocondria" calificacion="4.8"/>
        <NotasCard titulo="Matematicas" tarea ="Resolver Sumas" calificacion="4.0"/>
        </div>
        </div>
        </div>
    ) 
}