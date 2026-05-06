import React from "react";
import { useEffect, useContext, useState } from "react";
import { CalendarClassCard } from "../../components/student/Calendarclasscard.jsx";
import { FullCalendario } from "../../components/common/charts/FullCalendario.jsx";
import { CurrentClassIcon, NextClassIcon, ViewScheduleIcon } from "../../components/common/charts/CalendarIcons.jsx";
import { ButtonCommon } from "../../components/common/ButtonCommon.jsx";    
import { useNavigate } from "react-router-dom";
import { useRequestDB } from "../../hooks/utils/useRequestDB.js";
import { UserLoginContext } from "../../context/userLogin.jsx";
import "../../styles/student/StudentCalendar.css";

export function StudentCalendar() {
    const navigate = useNavigate();
    const { requestDB } = useRequestDB();
    const { userLogin } = useContext(UserLoginContext);
    const [calendarInfo, setCalendarInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [proximosEventos, setProximosEventos] = useState([]);
   
    const [colorClaseActual, setColorClaseActual] = useState("#275ee1");
    const [colorProximaClase, setColorProximaClase] = useState("#0FAB83");

    useEffect(() => {
        const fetchCalendarInfo = async () => {
            setLoading(true);
            
            const usuid = userLogin?.userInfo?.usuid;
            const cedid = userLogin?.educativeCenterInfo?.[0]?.cedid;
            const cecid = userLogin?.currentCycleInfo?.cecid;
            
            if (!usuid || !cedid || !cecid) {
               
                setLoading(false);
                return;
            }
            
            const result = await requestDB(`student/calendar/${usuid}/${cedid}/${cecid}`);
           
            
            if (result.ok && result.data && result.data.length > 0) {
                const eventos = result.data[0]?.proximos_eventos || [];
                setProximosEventos(eventos);
                
                try {
                    if (result.data[0]?.clase_actual_color) {
                        const claseActualColor = typeof result.data[0].clase_actual_color === 'string' 
                            ? JSON.parse(result.data[0].clase_actual_color) 
                            : result.data[0].clase_actual_color;
                        const colorValue = claseActualColor.color;
                        console.log("Color clase actual: ", colorValue);
                        setColorClaseActual(colorValue.startsWith('#') ? colorValue : `#${colorValue}`);
                    }
                } catch (error) {
                    setColorClaseActual("#275ee1");
                }
                
                try {
                    if (result.data[0]?.proxima_clase_color) {
                        const proximaClaseColor = typeof result.data[0].proxima_clase_color === 'string' 
                            ? JSON.parse(result.data[0].proxima_clase_color) 
                            : result.data[0].proxima_clase_color;
                        const colorValue = proximaClaseColor.color;
                        setColorProximaClase(colorValue.startsWith('#') ? colorValue : `#${colorValue}`);

                        console.log("Color proxima clase: ", colorValue);
                    }
                } catch (error) {
                    setColorProximaClase("#6922c5ff");
                }
            }
            
            setCalendarInfo(result);
            setLoading(false);
        };
        
        if (userLogin) {
            fetchCalendarInfo();
        } else {
            setLoading(false);
        }
    }, [userLogin]);

    if (loading) {
        return <div className="calendar-components"><h1>Cargando...</h1></div>;
    }

    return (
        <div className="calendar-components">
            <div className="calendar-classes">
                <CalendarClassCard 
                    estado="Clase en curso" 
                    icon={<CurrentClassIcon />} 
                    nombre_clase={calendarInfo?.data?.[0]?.clase_actual_nombre || "Sin clase"} 
                    salon={calendarInfo?.data?.[0]?.clase_actual_salon || "---"} 
                    color={colorClaseActual}
                    coloricono={colorClaseActual}
                />
                <CalendarClassCard 
                    estado="Próxima clase" 
                    icon={<NextClassIcon />} 
                    nombre_clase={calendarInfo?.data?.[0]?.proxima_clase_nombre || "Sin clase"} 
                    salon={calendarInfo?.data?.[0]?.proxima_clase_salon || "---"} 
                    color={colorProximaClase}
                    coloricono={colorProximaClase}
                />
            </div>
            <div className="calendar-button">
                <ButtonCommon icon={<ViewScheduleIcon />} text="Ver Horario completo" onClick={() => navigate("/student/calendario/horario-completo")} />
            </div>
            <div className="calendar-calendar">
                <FullCalendario eventosCalendar={proximosEventos} />
            </div>
        </div>
    );
}