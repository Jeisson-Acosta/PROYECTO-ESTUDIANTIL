import { useRef, useState, useEffect, useContext } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from "@fullcalendar/core/locales/es"
import "../../../styles/common/charts/FullCalendar.css"
import { ArrowLeftIcon, ArrowRightIcon } from "./CalendarIcons"
import { useRequestDB } from '../../../hooks/utils/useRequestDB.js'
import { UserLoginContext } from '../../../context/userLogin.jsx'

export function FullCalendario() {
    const calendarRef = useRef(null)
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const [eventos, setEventos] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())

    const getSundayOfWeek = (date) => {
        const currentDate = new Date(date)
        const day = currentDate.getDay()
        const sunday = new Date(currentDate)
        sunday.setDate(currentDate.getDate() - day)
        sunday.setHours(0, 0, 0, 0)
        return sunday
    }

    const renderDayHeader = (date) => {
        const days = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
        const dayName = days[date.date.getDay()]
        const dayNumber = date.date.getDate()
        const today = new Date()
        const isToday = date.date.getDate() === today.getDate() &&
                        date.date.getMonth() === today.getMonth() &&
                        date.date.getFullYear() === today.getFullYear()
        
        
        return (
            <div className="day-header">
                <div className="day-name">
                    {dayName}
                </div>
                <div className={`day-number ${isToday ? 'today-circle' : ''}`}>
                    {dayNumber}
                </div>
            </div>
        )
    }

    const getWeekRange = (date) => {
        const sunday = getSundayOfWeek(date)
        const saturday = new Date(sunday)
        saturday.setDate(sunday.getDate() + 6)
        
        const startMonth = sunday.toLocaleDateString('es-ES', { month: 'long' })
        const endMonth = saturday.toLocaleDateString('es-ES', { month: 'long' })
        
        if (startMonth !== endMonth) {
            return `${sunday.getDate()} de ${startMonth} - ${saturday.getDate()} de ${endMonth} ${saturday.getFullYear()}`
        }
        
        return `${sunday.getDate()} - ${saturday.getDate()} de ${endMonth} ${saturday.getFullYear()}`
    }

    const handleDatesSet = (dateInfo) => {
        const newCurrentDate = dateInfo.view.currentStart
        setCurrentDate(newCurrentDate)
    }
    const handlePrev = () => {
        const calendarApi = calendarRef.current?.getApi()
        if (calendarApi) {
            calendarApi.prev()
        }
    }

    const handleNext = () => {
        const calendarApi = calendarRef.current?.getApi()
        if (calendarApi) {
            calendarApi.next()
        }
    }

  
 useEffect(() => {
    const fetchCalendarInfo = async () => {
        const usuid = userLogin?.userInfo?.usuid;
        const cedid = userLogin?.educativeCenterInfo?.[0]?.cedid;
        const cecid = userLogin?.currentCycleInfo?.cecid;
        
        if (!usuid || !cedid || !cecid) {
            return;
        }
        
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
        
        const result = await requestDB(`student/calendar/${usuid}/${cedid}/${cecid}`);
        console.log("Calendar info: ", result.data[0].proximos_eventos);
        
        const eventosData = result.data[0].proximos_eventos.map(evento => {
            const fechaStart = formatToLocalDateTime(evento.fecha_fin);
            console.log("Fecha final para calendario:", fechaStart);
            
            return {
                title: evento.nombre_trabajo || evento["nombre-materia"],
                start: fechaStart,
                color: `#${evento.color_materia?.color || '0f1a7e'}`,
                borderColor: 'transparent',
                extendedProps: {
                    id_trabajo: evento.id_trabajo,
                    materia: evento["nombre-materia"]
                }
            };
        });
        
        console.log("Eventos formateados: ", eventosData);
        setEventos(eventosData);
    };
    
    fetchCalendarInfo();
}, [userLogin]);
    return (
        <div className="calendario-container">
            <div className="calendar-header">
                <h2>{getWeekRange(currentDate)}</h2>
                <div className="calendar-header-buttons">
                    <button className="calender-button" onClick={handlePrev} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                        <ArrowLeftIcon/>
                    </button>
                    <button className="calender-button" onClick={handleNext} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                        <ArrowRightIcon/>
                    </button>
                </div>
            </div>
            <div className="calendar-body">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    locale={esLocale}
                    events={eventos}
                    headerToolbar={false}
                    height="auto"
                    slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                    allDaySlot={false}
                    dayHeaderContent={renderDayHeader}  
                    firstDay={0}
                    datesSet={handleDatesSet} 
                    initialDate={getSundayOfWeek(new Date())}
                />
            </div>
        </div>
    )
}