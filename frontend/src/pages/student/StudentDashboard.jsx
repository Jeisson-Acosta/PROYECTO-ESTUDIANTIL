// common/Stats.jsx
import  { useContext } from 'react'
import '../../styles/student/StudentDashboard.css'
import { StudentCard } from '../../components/student/StudentCard.jsx'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { MateriasCard } from '../../components/student/MateriasCard.jsx'
import {IconStar,IconAsistance,IconSubject} from '../../components/common/IconsLayout.jsx'
import { NotasCard } from '../../components/student/NotasCard.jsx'
import { CircleChart } from '../../components/common/charts/CircleChart.jsx'
export function StudentDashboard() {
    const { userLogin } = useContext(UserLoginContext) || {};
    if (!userLogin) {
        return null;
    }
    

   // const total_materias = userLogin.total_materias;
    //const promedio = userLogin.promedio;
    //const total_inasistencias = userLogin.total_inasistencias;


    return (
        <div className="principal-content">

            <div className='stats-dashboard'>
                <StudentCard titulo="Materias Inscritas" valor={userLogin?.total_materias} adicional="+2 en el ciclo" Icono={IconSubject}/>
                <StudentCard titulo="Promedio Estudiante" valor={userLogin?.promedio} adicional="top 5 en la clase" Icono={IconStar}/>
                <StudentCard titulo="Inasistencias" valor={userLogin?.total_inasistencias} adicional="98% de asistencia" Icono= {IconAsistance}/>
            </div>
            <div className='stats-dashboard'>
            

            <div className='circle-chart-section'>
            <div className='title-section'>
                <h3 className='title'>Progreso Diario</h3>
            </div>
                <CircleChart endValue={100} value={80} labelCenter="Meta Hoy" color="#2c1470ff" strokeWidth={10}/>
             <div className='circle-chart-resumen'>
            <h3>Excelente Desempeño</h3>
              
            </div>
            </div>
           
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
            <h3 className='title-more'>Ver Todas</h3>
        </div>
            <NotasCard titulo="Ciencias" tarea ="Dibujar la mitocondria" calificacion="4.8"/>
            <NotasCard titulo="Matematicas" tarea ="Resolver Sumas" calificacion="4.0"/>
            <NotasCard titulo="Español" tarea ="¿Que es una Oda" calificacion="3.7"/>
        </div>
        </div>
        <div className='stats-dashboard'>
        <div className='title-section'>
         
        </div>
            
        </div>
            
        </div>

    ) 
}