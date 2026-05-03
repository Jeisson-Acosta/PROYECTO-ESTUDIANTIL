import "../../styles/common/classes/Calendar.css/StudentNextDeliveries.css"
export function ScheduleNextDeliveries({icon,titulo,asignatura,fecha}) {
    return (
        <div className="schedule-next-deliveries">
         <div className="delivery-icon">
          {icon}
         </div>
         <div className="delivery-info">
            <p>{titulo}</p>
            <p>{asignatura}</p>
         </div>
         <div className="delivery-date">
            <h1>{fecha}</h1>
         </div>
        </div>
    );
}