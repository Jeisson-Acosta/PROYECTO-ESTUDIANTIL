import { ClockHour4Icon } from "../../components/common/charts/ScheduleIcons.jsx";
import "../../styles/common/classes/Calendar.css/ScheduleNextClass.css"
export function ScheduleNextClass() {
    return (
        <div className="schedule-next-class">
            <div className="schedule-next-class-header">
                <ClockHour4Icon />
                <h1>Proxima clase</h1>
            </div>
            <div className="schedule-next-class-body">
                <h1 >Fisica Clase</h1>
                <p>En 45 minutos - Lab 8</p>
            </div>
            <div className="schedule-next-class-footer">
              <button>Ver Detalles</button>
            </div>
        </div>
    );
}