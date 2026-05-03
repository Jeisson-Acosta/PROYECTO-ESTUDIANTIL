import { Schedule } from "../../components/common/charts/Schedule.jsx"
import { ScheduleNextClass } from "../../components/student/ScheduleNextClase.jsx"
import { ScheduleNextDeliveries } from "../../components/student/ScheduleNextDeliveries.jsx"
import { ClipBoardListIcon } from "../../components/common/charts/ScheduleIcons.jsx"
import "../../styles/student/StudentSchedule.css"
export function StudentShedule() {
    return (
        <div className="schedule-student">
            <div className="schedule-calendar">
             <Schedule />
            </div>
            <div className="schedule-footer">
                <div className="schedule-next-class-container">
                    <ScheduleNextClass />
                </div>
                <div className="schedule-next-deliveries-container">
                <div className="schedule-next-deliveries-header">
                <ClipBoardListIcon />
                <h1>Entregas pendientes</h1>
                </div>
                <div className="deliveries-list">
                     <ScheduleNextDeliveries
                    titulo="Reporte de literatura"
                    asignatura="Literatura"
                    fecha="Hoy 23:59"
                    />
                    <ScheduleNextDeliveries
                    titulo="Ensayo de lectura"
                    asignatura="ingles nivel 4"
                    fecha="Mañana"
                    />
                   
                </div>
                    
                </div>
            </div>
        </div>

    )
}