import { Schedule } from "../../components/common/charts/Schedule.jsx"
import { ScheduleNextClass } from "../../components/student/ScheduleNextClase.jsx"
import { ScheduleNextDeliveries } from "../../components/student/ScheduleNextDeliveries.jsx"
import { ClipBoardListIcon } from "../../components/common/charts/ScheduleIcons.jsx"
import "../../styles/student/StudentSchedule.css"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { UserLoginContext } from "../../context/userLogin.jsx"
import { useContext, useState, useEffect } from "react"

export function StudentShedule() {
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const [horario, setHorario] = useState([])
    const [entregasPendientes, setEntregasPendientes] = useState([]) // 🔥 Agregar este estado

    useEffect(() => {
        const fetchScheduleInfo = async () => {
            const usuid = userLogin?.userInfo?.usuid;
            console.log(userLogin.userInfo);
            const cedid = userLogin?.educativeCenterInfo?.[0]?.cedid;
            const cecid = userLogin?.currentCycleInfo?.cecid;
            console.log(userLogin.educativeCenterInfo);
            console.log(userLogin.currentCycleInfo);
            
            if (!usuid || !cedid || !cecid) {
                return;
            }
            
            const result = await requestDB(`student/schedule/${usuid}/${cedid}/${cecid}`);
            setHorario(result.data[0]);
            
            const entregas = result.data[0]?.entregas_pendientes || [];
            setEntregasPendientes(entregas); // 🔥 Guardar en el estado
            console.log("Entregas pendientes: ", entregas);
        };
        
        fetchScheduleInfo();
    }, [userLogin]);

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
                        {entregasPendientes.map((entrega, index) => (
                            <ScheduleNextDeliveries
                                key={entrega.id_trabajo || index} 
                                titulo={entrega.nombre_trabajo}
                                asignatura={entrega.nombre_materia}
                                fecha={entrega.estado}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}