// common/Stats.jsx
import { useContext } from 'react';
import '../../styles/student/StudentDashboard.css';
import { StudentCard } from '../../components/student/StudentCard.jsx';
import { UserLoginContext } from '../../context/userLogin.jsx';
import { MateriasCard } from '../../components/student/MateriasCard.jsx';
import { IconStar, IconAsistance, IconSubject } from '../../components/common/IconsLayout.jsx';
import { NotasCard } from '../../components/student/NotasCard.jsx';
import { CircleChart } from '../../components/common/charts/CircleChart.jsx';
import DesempeñoMaterias from '../../components/student/graphicperformance.jsx';
export function StudentDashboard() {
    const { userLogin } = useContext(UserLoginContext) || {};
    
    if (!userLogin.userInfo) return null;
    
   const obtenerNotas = () => {
    let notasArray = [];
    
    if (userLogin?.ultimas_notas && typeof userLogin.ultimas_notas === 'string') {
        try {
            notasArray = JSON.parse(userLogin.ultimas_notas);
        } catch (e) {
            console.error('Error parsing notas:', e);
            notasArray = [];
        }
    } else if (Array.isArray(userLogin?.ultimas_notas)) {
        notasArray = userLogin.ultimas_notas;
    }
    
    const notasProcesadas = notasArray.map(nota => ({
        ...nota,
        color_nota: nota.color_nota || this.obtenerColorPorNota(nota.calificacion_tarea) || '#cccccc'
    }));
    
    if (notasProcesadas.length === 0) {
        return [
            { 
                nombre_materia: 'No hay materias', 
                titulo_tarea: 'Sin tareas', 
                calificacion_tarea: 0, 
                color_nota: '#cccccc' 
            },
            { 
                nombre_materia: 'No hay materias', 
                titulo_tarea: 'Sin tareas', 
                calificacion_tarea: 0, 
                color_nota: '#cccccc' 
            },
            { 
                nombre_materia: 'No hay materias', 
                titulo_tarea: 'Sin tareas', 
                calificacion_tarea: 0, 
                color_nota: '#cccccc' 
            }
        ];
    }

    const notas = [...notasProcesadas];
    while (notas.length < 3) {
        notas.push({
            nombre_materia: 'No hay materias',
            titulo_tarea: 'Sin tareas',
            calificacion_tarea: 0,
            fecha: null,
            color_nota: '#cccccc'
        });
    }

    return notas.slice(0, 3);
};

function obtenerColorPorNota(calificacion) {
    if (!calificacion && calificacion !== 0) return '#cccccc';
    
    if (calificacion >= 4 && calificacion <= 5) return '#a9ffae';
    if (calificacion >= 3 && calificacion < 4) return '#f8f289';
    if (calificacion <= 2.9) return '#fb9b9b';
    return '#cccccc';
}
const obtenerProximasClases = () => {
    let clasesArray = [];
    
    if (userLogin?.proximas_clases && typeof userLogin.proximas_clases === 'string') {
        try {
            clasesArray = JSON.parse(userLogin.proximas_clases);
        } catch (e) {
            clasesArray = [];
        }
    }
    else if (Array.isArray(userLogin?.proximas_clases)) {
        clasesArray = userLogin.proximas_clases;
    }
    else {
        clasesArray = [];
    }
    
    const formatearHora = (horaCompleta) => {
        
        if (!horaCompleta || horaCompleta === '--:--') return '--:--';
        
        if (typeof horaCompleta === 'string') {
            if (horaCompleta.includes(':')) {
                const horaFormateada = horaCompleta.substring(0, 5);
                return horaFormateada;
            }
        }
        
        return horaCompleta;
    };
    
    const clasesProcesadas = clasesArray.map(clase => {
        let horaOriginal = clase.hora || clase.hora_materia || '';
        let horaFormateada = formatearHora(horaOriginal);
        
        let colorValue = '#cccccc'; // valor por defecto
        
        if (clase.color) {
            if (typeof clase.color === 'string') {
                try {
                    const colorObj = JSON.parse(clase.color);
                    colorValue = colorObj.color || colorValue;
                } catch {
                    colorValue = clase.color;
                }
            } 
            else if (typeof clase.color === 'object' && clase.color.color) {
                colorValue = clase.color.color;
            }
        }
        return {
            nombre_materia: clase.materia || clase.nombre_materia || 'Sin materia',
            aula_materia: clase.salon || clase.aula || clase.aula_materia || 'Sin salón',
            hora_materia: horaFormateada,
            profesor_materia: clase.docente || clase.profesor || clase.profesor_materia || 'Sin docente',
            color: colorValue // Incluir el color
        };
    });
    

    if (clasesProcesadas.length === 0) {
        return [
            { 
                nombre_materia: 'No hay clases', 
                aula_materia: '---', 
                hora_materia: '--:--', 
                profesor_materia: '---',
                color: '#cccccc'
            },
            { 
                nombre_materia: 'No hay clases', 
                aula_materia: '---', 
                hora_materia: '--:--', 
                profesor_materia: '---',
                color: '#cccccc'
            }
        ];
    }

    const clases = [...clasesProcesadas];
    while (clases.length < 2) {
        clases.push({
            nombre_materia: 'No hay clases',
            aula_materia: '---',
            hora_materia: '--:--',
            profesor_materia: '---',
            color: '#cccccc'
        });
    }

    const resultado = clases.slice(0, 2);
    
    return resultado;
};

    const notasAMostrar = obtenerNotas();
    const clasesAMostrar = obtenerProximasClases();

    return (
        <div className="principal-content">
            <div className='stats-dashboard'>
                <StudentCard 
                    titulo="Materias Inscritas" 
                    valor={userLogin?.total_materias || 0} 
                    adicional={userLogin?.mensaje_materias || "Sin materias"} 
                    Icono={IconSubject}
                />
                <StudentCard 
                    titulo="Promedio Estudiante" 
                    valor={userLogin?.promedio || 0} 
                    adicional={userLogin?.mensaje_rank || "Sin promedio"} 
                    Icono={IconStar}
                />
                <StudentCard 
                    titulo="Inasistencias" 
                    valor={userLogin?.total_inasistencias || 0} 
                    adicional={userLogin?.mensaje_asistencia || "Sin inasistencias"} 
                    Icono={IconAsistance}
                />
            </div>
            <div className='graphics-dashboard'>
            <div className='average-graphic'>
             <DesempeñoMaterias/>
            </div>
            </div>
            <div className='stats-dashboard'>
                <div className='circle-chart-section'>
                    <div className='title-section'>
                        <h3 className='title'>Progreso Diario</h3>
                    </div>
                    <CircleChart  
                        endValue={100} 
                        value={`${userLogin?.progreso_estudiante || 0}`} 
                        labelCenter="Meta Hoy" 
                        color={userLogin?.color_resumen_grafico} 
                        strokeWidth={10}
                        additionalText='%'
                    />
                    <div className='circle-chart-resumen'
                         style={{backgroundColor: userLogin?.color_resumen}}>
                        <h3>{userLogin?.progreso_resumen || "Sin progreso"}</h3>
                    </div>
                </div>
           
                <div className="materias-seccion">
                    <div className='title-section'>
                        <h3 className='title'>Próximas Clases</h3>
                        <h3 className='dia'>HOY</h3>
                    </div>
                    {clasesAMostrar.map((clase, index) => (
                        <MateriasCard 
                            key={index}
                            titulo={clase.nombre_materia}
                            aula={clase.aula_materia}
                            hora={clase.hora_materia}
                            profesor={clase.profesor_materia}
                            color={clase.color}
                        />
                    ))}
                </div>
                
                <div className='notas-seccion'>
                    <div className='title-section'>
                        <h3 className='title'>Últimas Notas</h3>
                        <h3 className='title-more'>Ver Todas</h3>
                    </div>
                    
                    {notasAMostrar.map((nota, index) => (
                        <NotasCard 
                            key={index}
                            titulo={nota.nombre_materia}
                            tarea={nota.titulo_tarea}
                            calificacion={nota.calificacion_tarea}
                            color_nota={nota.color_nota}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}