import { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from "@fullcalendar/core/locales/es"
import '../../../styles/common/charts/Schedule.css'

export function Schedule() {
    
    const calendarRef = useRef(null)
    const [events] = useState([
        {
            title: 'Matemáticas',   
            start: '2026-04-27T07:00:00',
            end: '2026-04-27T08:30:00',
            extendedProps: { aula: '103', profesor: 'Prof. Juan' },
            allDay: false,
            display: 'block',
            color: '#275ee1',  // Color personalizado
            textColor: '#ffffff',  // Color del texto
            borderColor: '#275ee1',
        },
        {
            title: 'Matemáticas',   
            start: '2026-04-27T07:00:00',
            end: '2026-04-27T08:30:00',
            extendedProps: { aula: '103', profesor: 'Prof. Juan' },
            allDay: false,
            display: 'block',
            color: '#275ee1',  // Color personalizado
            textColor: '#ffffff',  // Color del texto
            borderColor: '#275ee1',
        },
    ])

    const getCurrentWeekRange = () => {
        const today = new Date()
        const currentDay = today.getDay()
        const daysToMonday = currentDay === 0 ? 6 : currentDay - 1
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - daysToMonday)
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 4)
        const startMonth = startOfWeek.toLocaleString('es', { month: 'long' })
        const endMonth = endOfWeek.toLocaleString('es', { month: 'long' })
        const year = startOfWeek.getFullYear()
        return `${startOfWeek.getDate()} ${startMonth} - ${endOfWeek.getDate()} ${endMonth}, ${year}`
    }

    const getVisibleRange = () => {
        const today = new Date()
        const currentDay = today.getDay()
        const daysToMonday = currentDay === 0 ? 6 : currentDay - 1
        const start = new Date(today)
        start.setDate(today.getDate() - daysToMonday)
        start.setHours(0, 0, 0, 0)
        
        const end = new Date(start)
        end.setDate(start.getDate() + 4)
        end.setHours(23, 59, 59, 999)
        
        return { start, end }
    }

    return (
        <div className="schedule">
            <div className="schedule-header">
                <h2>Semana Actual</h2>
                <span className="schedule-date">{getCurrentWeekRange()}</span>
            </div>
            <div className="schedule-calendar">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    locales={[esLocale]}
                    locale="es"
                    headerToolbar={false}
                    visibleRange={getVisibleRange()}
                    events={events}
                    slotMinTime="06:00:00"
                    slotMaxTime="22:00:00"
                    allDaySlot={false}
                    slotDuration="00:30:00"
                    slotLabelInterval="01:00:00"
                    slotLabelFormat={{
                        hour: "numeric",
                        minute: "2-digit",
                        omitZeroMinute: false,
                        meridiem: false
                    }}
                    firstDay={1}
                    height="auto"
                    contentHeight="auto"
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    nowIndicator={true}
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    }}
                    dayHeaderContent={(args) => {
                        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                        const date = args.date;
                        const dayName = days[date.getDay()];
                        const dayNumber = date.getDate();
                        const month = date.toLocaleString('es', { month: 'long' });
                        
                        // Verificar si es el día actual
                        const today = new Date();
                        const isToday = date.toDateString() === today.toDateString();
                        
                        return (
                            <div className="custom-day-header">
                                <div className={`day-name ${isToday ? 'day-name-actual' : ''}`}>
                                    {dayName}
                                </div>
                                <div className={`day-date ${isToday ? 'day-date-actual' : ''}`}>
                                    {dayNumber} de {month}
                                </div>
                            </div>
                        );
                    }}
                    titleFormat={false}
                />
            </div>
        </div>
    );

    function renderEventContent(arg) {
        return (
            <div className="event-content">
                <div className="event-time">
                    <b>{arg.timeText}</b>
                </div>
                <div className="event-title">
                    <i>{arg.event.title}</i>
                </div>
            </div>
        );
    }

    function handleEventClick(clickInfo) {
        alert(
            `Clase: ${clickInfo.event.title}\n` +
            `Hora: ${clickInfo.event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} - ${clickInfo.event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`
        );
    }
}