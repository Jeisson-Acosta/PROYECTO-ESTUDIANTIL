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
    console.log(userLogin);

   // const total_materias = userLogin.total_materias;
    //const promedio = userLogin.promedio;
    //const total_inasistencias = userLogin.total_inasistencias;


    return (
        <div className="principal-content">

            <div className='stats-dashboard'>
                <StudentCard titulo="Materias Inscritas" valor={userLogin?.total_materias || 0} adicional={userLogin?.mensaje_materias || "Sin materias"} Icono={IconSubject}/>
                <StudentCard titulo="Promedio Estudiante" valor={userLogin?.promedio || 0} adicional={userLogin?.mensaje_rank || "Sin promedio"} Icono={IconStar}/>
                <StudentCard titulo="Inasistencias" valor={userLogin?.total_inasistencias || 0} adicional={userLogin?.mensaje_asistencia || "Sin inasistencias"} Icono= {IconAsistance}/>
            </div>
            <div className='stats-dashboard'>
            

            <div className='circle-chart-section'>
            <div className='title-section'>
                <h3 className='title'>Progreso Diario</h3>
            </div>
                <CircleChart  endValue={100} value={`${userLogin?.progreso_estudiante || 0}`} labelCenter="Meta Hoy" color={userLogin?.color_resumen_grafico} strokeWidth={10}/>
             <div className='circle-chart-resumen'
             style={{backgroundColor: userLogin?.color_resumen}}>
            <h3 >{userLogin?.progreso_resumen || "Sin progreso"}</h3>
              
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
            <NotasCard titulo={userLogin?.nombre_materia} tarea = {userLogin?.titulo_tarea || "Sin tareas"} calificacion={userLogin?.calificacion_tarea}/>
            <NotasCard titulo={userLogin?.nombre_materia2} tarea = {userLogin?.titulo_tarea || "Sin tareas"} calificacion={userLogin?.calificacion_tarea}/>
            <NotasCard titulo={userLogin?.nombre_materia3} tarea = {userLogin?.titulo_tarea || "Sin tareas"} calificacion={userLogin?.calificacion_tarea}/>
        </div>
        </div>
        <div className='stats-dashboard'>
        <div className='title-section'>
         
        </div>
            
        </div>
            
        </div>

    ) 
}