import { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from "@fullcalendar/core/locales/es"
import "../../../styles/common/charts/FullCalendar.css"
import { ArrowLeftIcon, ArrowRightIcon } from "./CalendarIcons"

export function FullCalendario() {
    const calendarRef = useRef(null)
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
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
    const events = [
    
    ]

    const getWeekRange = (date) => {
        const start = new Date(date)
        const end = new Date(date)
        end.setDate(end.getDate() + 6)
        return `${start.getDate()} - ${end.getDate()} de ${end.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`
    }

    return (
        <div className="calendario-container">
            <div className="calendar-header">
                <h2>{getWeekRange(currentDate)}</h2>
            <div className="calendar-header-buttons">
                <button className="calender-button" onClick={() => { calendarRef.current?.getApi().prev(); setCurrentDate(calendarRef.current?.getApi().getDate().toISOString().split('T')[0]) }} style={{ padding: '8px 16px', cursor: 'pointer' }}><ArrowLeftIcon/></button>
                <button className="calender-button" onClick={() => { calendarRef.current?.getApi().next(); setCurrentDate(calendarRef.current?.getApi().getDate().toISOString().split('T')[0]) }} style={{ padding: '8px 16px', cursor: 'pointer' }}><ArrowRightIcon/></button>
            </div>
            </div>
           <div className="calendar-body">
            
           
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                initialDate={new Date().toISOString().split('T')[0]}
                locale={esLocale}
                events={events}
                headerToolbar={false}
                height="auto"
                slotMinTime="00:00:00"
                slotMaxTime="23:59:59"
                slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                allDaySlot={false}
                 dayHeaderContent={renderDayHeader}  
                 firstDay={0}
            />
            </div>
        </div>
    )
}