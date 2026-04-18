import '../../styles/docent/StudentCard.css'

export function StudentCard({ student }) {
    return (
        <div key={student.usuid} className="student-card">
            <section className="avatar-student">
                {student.usunom.split(' ')[0][0] + student.usunom.split(' ')[1][0]}
                <span 
                    className={`status-student ${student.performance === 'AT RISK' ? 'at-risk' : student.performance.toLowerCase()}`}
                >
                    {student.performance === 'AT RISK' ? 'En Riesgo' : student.performance === 'STEADY' ? 'Estable' : 'Ejemplar'}
                </span>
            </section>
            <div className="info-student">
                <h3>{student.usunom}</h3>
                <span>{student.usuemail}</span>
            </div>
            <div className="info-performance-student">
                <div className="average-student">
                    <span className="title">Promedio</span>
                    <span>
                        <span
                            style={{color: '#4a9389', fontWeight: 'bold', fontSize: '18px', fontFamily: 'fontSubtitles'}}
                        >
                            {student.average}
                        </span>
                        <span
                            style={{color: '#c3c4c4', fontWeight: 'bold', fontSize: '12px', fontFamily: 'fontSubtitles'}}
                        >/5.0</span>
                    </span>
                </div>
                <div className="attendance-student">
                    <span className="title">Asistencia</span>
                    <span style={{fontFamily: 'fontSubtitles', fontWeight: 'bold'}}>
                        {student.attendance}%
                    </span>
                </div>
            </div>
        </div>
   
    )
}