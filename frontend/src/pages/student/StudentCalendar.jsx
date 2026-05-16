import { useEffect, useContext, useState } from "react"
import { CalendarClassCard } from "../../components/student/Calendarclasscard.jsx"
import { CurrentClassIcon, NextClassIcon, ViewScheduleIcon } from "../../components/common/charts/CalendarIcons.jsx"
import { ButtonCommon } from "../../components/common/ButtonCommon.jsx";   
import { useNavigate } from "react-router-dom"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { UserLoginContext } from "../../context/userLogin.jsx"
import { CalendarComponent } from "../../components/common/charts/CalendarComponent.jsx"
import { useTitleHeaderOption } from "../../hooks/common/useTitleHeaderOption.js"
import "../../styles/student/StudentCalendar.css"

export function StudentCalendar() {
    const navigate = useNavigate();
    const { requestDB } = useRequestDB();
    const { userLogin } = useContext(UserLoginContext);
    const { setTitleHeaderOption } = useTitleHeaderOption();
    const [calendarInfo, setCalendarInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [proximosEventos, setProximosEventos] = useState([
    // ── Evento normal con ubicación ──────────────────
    {
        id: "1",
        title: "Matemáticas",
        start: new Date(2026, 4, 15, 8, 0),   // 15 mayo 2026, 08:00
        end: new Date(2026, 4, 15, 10, 0),    // 15 mayo 2026, 10:00
        extendedProps: {
            color: "blue",
            location: "Aula 201",
        },
    },

    // ── Evento con badge de examen ───────────────────
    {
        id: "2",
        title: "Ciencias",
        start: new Date(2026, 4, 16, 9, 0),
        end: new Date(2026, 4, 16, 11, 0),
        extendedProps: {
            color: "green",
            tag: "Examen",
            tagType: "exam",
        },
    },

    // ── Evento con badge de tarea pendiente ──────────
    {
        id: "3",
        title: "Inglés",
        start: new Date(2026, 4, 17, 11, 0),
        end: new Date(2026, 4, 17, 13, 0),
        extendedProps: {
            color: "pink",
            tag: "Tarea pendiente",
            tagType: "warning",
        },
    },

    // ── Evento con ubicación en cursiva ─────────────
    {
        id: "4",
        title: "Grupo Estudio",
        start: new Date(2026, 4, 16, 10, 0),
        end: new Date(2026, 4, 16, 13, 0),
        extendedProps: {
            color: "gray",
            location: "Biblioteca",
        },
    },

    // ── Evento tipo deadline (solo fecha límite) ─────
    {
        id: "5",
        title: "Entregar ensayo",
        start: new Date(2026, 4, 19, 15, 50),  // sin end
        extendedProps: {
            color: "red",
            type: "deadline",
        },
    },

    // ── También puedes usar strings ISO ─────────────
    {
        id: "6",
        title: "Historia",
        start: "2026-05-19T14:00:00",
        end: "2026-05-19T15:00:00",
        extendedProps: {
            color: "purple",
        },
    },
]);
   
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
                const formatToLocalDateTime = (fechaStr) => {
                    if (typeof fechaStr === "string") {
                        const match = fechaStr.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
                        if (match) {
                            const [_, year, month, day, hour, minute, second] = match;
                            return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
                        }
                    }
                    return fechaStr;
                };

                const rawEventos = result.data[0]?.proximos_eventos || [];
                console.log("Eventos recibidos del API:", rawEventos);

                const eventosFormateados = rawEventos.map(evento => {
                    // Si ya tiene el formato correcto, no lo tocamos
                    if (evento.start) return evento;

                    // Mapeo de fechas
                    const dateStr = evento.fecha_fin || evento.fecha_entrega || evento.fecha_inicio || evento.fecha;
                    if (!dateStr) return null;

                    const finalStart = formatToLocalDateTime(dateStr);
                    const colorMateria = evento.color_materia?.color;
                    const colorFinal = colorMateria ? (colorMateria.startsWith('#') ? colorMateria : `#${colorMateria}`) : '#3b82f6';

                    return {
                        id: evento.id_trabajo || String(Math.random()),
                        title: evento.nombre_trabajo || evento["nombre-materia"] || "Evento",
                        start: finalStart,
                        extendedProps: {
                            location: evento.salon || "",
                            tag: evento.tipo_trabajo || null,
                            color: colorFinal,
                            type: evento.id_trabajo ? 'deadline' : 'normal'
                        }
                    };
                }).filter(Boolean);

                console.log("Eventos formateados para FullCalendar:", eventosFormateados);
                // setProximosEventos(eventosFormateados);
                
                try {
                    if (result.data[0]?.clase_actual_color) {
                        const claseActualColor = typeof result.data[0].clase_actual_color === 'string' 
                            ? JSON.parse(result.data[0].clase_actual_color) 
                            : result.data[0].clase_actual_color;
                        const colorValue = claseActualColor.color;
                        console.log("Color clase actual: ", colorValue);
                        setColorClaseActual(colorValue.startsWith('#') ? colorValue : `#${colorValue}`);
                    }
                } catch {
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
                } catch {
                    setColorProximaClase("#6922c5ff");
                }
            }
            
            setCalendarInfo(result);
            setLoading(false);
        };
        
        setTitleHeaderOption('Calendario')
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
                <CalendarComponent events={proximosEventos} />
            </div>
        </div>
    );
}