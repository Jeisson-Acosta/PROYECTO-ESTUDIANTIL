import { ClockHour4Icon } from "../../components/common/charts/ScheduleIcons.jsx";
import "../../styles/common/classes/Calendar.css/ScheduleNextClass.css"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { UserLoginContext } from "../../context/userLogin.jsx"
import { useContext, useState, useEffect } from "react"

export function ScheduleNextClass() {
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const [horario, setHorario] = useState(null) // Cambiado a null inicialmente
    const [loading, setLoading] = useState(true) // Estado de carga

    useEffect(() => {
        const fetchScheduleInfo = async () => {
            const usuid = userLogin?.userInfo?.usuid;
            const cedid = userLogin?.educativeCenterInfo?.[0]?.cedid;
            const cecid = userLogin?.currentCycleInfo?.cecid;
            
            console.log("Datos usuario:", {
                usuid,
                cedid, 
                cecid,
                userInfo: userLogin?.userInfo,
                educativeCenterInfo: userLogin?.educativeCenterInfo,
                currentCycleInfo: userLogin?.currentCycleInfo
            });
            
            if (!usuid || !cedid || !cecid) {
                console.log("Faltan datos necesarios");
                setLoading(false);
                return;
            }
            
            try {
                const result = await requestDB(`student/schedule/${usuid}/${cedid}/${cecid}`);
                console.log("Horario recibido:", result.data[0]);
                setHorario(result.data[0]);
            } catch (error) {
                console.error("Error fetching schedule:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchScheduleInfo();
    }, [userLogin]);

    // Mostrar loading mientras carga
    if (loading) {
        return (
            <div className="schedule-next-class">
                <div className="schedule-next-class-header">
                    <ClockHour4Icon />
                    <h1>Proxima clase</h1>
                </div>
                <div className="schedule-next-class-body">
                    <p>Cargando...</p>
                </div>
            </div>
        );
    }

    // Mostrar si no hay datos
    if (!horario) {
        return (
            <div className="schedule-next-class">
                <div className="schedule-next-class-header">
                    <ClockHour4Icon />
                    <h1>Proxima clase</h1>
                </div>
                <div className="schedule-next-class-body">
                    <p>No hay próxima clase</p>
                </div>
            </div>
        );
    }

    return (
        <div className="schedule-next-class">
            <div className="schedule-next-class-header">
                <ClockHour4Icon />
                <h1>Proxima clase</h1>
            </div>
            <div className="schedule-next-class-body">
                <h1>{horario.proxima_clase_nombre || "Sin materia"}</h1>
                <p>{horario.proxima_clase_tiempo || "No disponible"} - {horario.proxima_clase_salon || "No disponible"}</p>
            </div>
            <div className="schedule-next-class-footer">
                <button>Ver Detalles</button>
            </div>
        </div>
    );
}