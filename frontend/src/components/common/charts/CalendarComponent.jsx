import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../styles/common/charts/CalendarComponent.css'
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay, addWeeks, subWeeks, addMonths, subMonths, startOfMonth, endOfMonth } from "date-fns"
import { es } from 'date-fns/locale'
import { useCallback, useState } from "react"

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 0 }),
    getDay,
    locales: { es }
})

function PersonalizateEvent({ event }) {
    const { color = 'blue', location, tag, tagType, type, icon } = event.extendedProps || {}

    if (type === 'deadline') {
        return (
            <div className={`cal-evento cal-evento--${color} cal-evento--deadline`}>
                <div className="cal-evento__header">
                    <span className="cal-evento__dot" />
                    <strong className="cal-evento__title">{event.title}</strong>
                    <span className="cal-evento__deadline-badge">límite</span>
                </div>
            </div>   
        )
    }
    return (
        <div className={`cal-evento cal-evento--${color}`}>
            <div className="cal-evento__header">
                <span className="cal-evento__dot" />
                <strong className="cal-evento__title">{event.title}</strong>
            </div>
            {(event.start && event.end) && (
                <span className="cal-evento__time">
                    {format(event.start, "HH:mm")} – {format(event.end, "HH:mm")}
                </span>
            )}
            {location && <span className="cal-evento__location">{location}</span>}
            {tag && (
                <span className={`cal-evento__tag cal-evento__tag--${tagType || "default"}`}>
                    {tag}
                </span>
            )}
        </div>
    )
}

function DayHeader({ date, view }) {
    const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    const dayName = DAYS[date.getDay()]
    const dayNumber = date.getDate()
    const today = new Date()

    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()

    if (view === 'month') {
        return (
            <div className="cal-day-header cal-day-header--month">
                <span className="cal-day-header__name">{dayName}</span>
            </div>
        )
    }

    return (
        <div className="cal-day-header">
            <span className="cal-day-header__name">{dayName}</span>
            <span className={`cal-day-header__number ${isToday ? "cal-day-header__number--today" : ""}`}>
                {dayNumber}
            </span>
        </div>
    )
}

export function CalendarComponent({ events = [], initialView = 'week', onEventClick = null }) {
    const [view, setView] = useState(initialView)
    const [currentDate, setCurrentDate] = useState(new Date())

    // Normaliza los eventos que llegan: convierte strings ISO a Date
    const normalizedEvents = events.map((ev) => ({
        ...ev,
        start: ev.start instanceof Date ? ev.start : new Date(ev.start),
        end: ev.end
            ? ev.end instanceof Date ? ev.end : new Date(ev.end)
            : ev.start instanceof Date ? ev.start : new Date(ev.start),
    }))

    const handlePreviousWeekMonth = () => {
        setCurrentDate((prev) => 
            view === 'week' ? subWeeks(prev, 1) : subMonths(prev, 1)
        )
    }

    const handleNextWeekMonth = () => {
        setCurrentDate((prev) => 
            view === 'week' ? addWeeks(prev, 1) : addMonths(prev, 1)
        )
    }

    const handleToday = () => setCurrentDate(new Date())

    // ── Título del encabezado ─────────────────────────────────────────────
    const getTitle = () => {
        if (view === "week") {
            const domingo = startOfWeek(currentDate, { weekStartsOn: 0 })
            const sabado = new Date(domingo)
            sabado.setDate(domingo.getDate() + 6)

            const initMonth = format(domingo, "MMMM", { locale: es })
            const endMonth = format(sabado, "MMMM", { locale: es })
            const year = format(sabado, "yyyy")

            if (initMonth !== endMonth) {
                return `${domingo.getDate()} de ${initMonth} – ${sabado.getDate()} de ${endMonth} ${year}`
            }
            return `${domingo.getDate()} – ${sabado.getDate()} de ${initMonth} ${year}`
        }
        return format(currentDate, "MMMM yyyy", { locale: es })
    }

    const renderDayHeader = useCallback(({ date }) => {
        return <DayHeader date={date} view={view} />
    }, [view])

    return (
        <div className="cal-container">
            {/* Encabezado */}
            <div className="cal-header">
                <h2 className="cal-header__title">{getTitle()}</h2>
                <div className="cal-header__controls">
                    <div className="cal-view-switcher">
                        <button
                            className={`cal-view-btn ${view === "week" ? "cal-view-btn--active" : ""}`}
                            onClick={() => setView("week")}
                        >
                            Semana
                        </button>
                        <button
                            className={`cal-view-btn ${view === "month" ? "cal-view-btn--active" : ""}`}
                            onClick={() => setView("month")}
                        >
                            Mes
                        </button>
                    </div>
                    <div className="cal-nav">
                        <button className="cal-nav__btn" onClick={handlePreviousWeekMonth} aria-label="Semana anterior">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="cal-nav__btn cal-nav__btn--hoy" onClick={handleToday}>
                            Hoy
                        </button>
                        <button className="cal-nav__btn" onClick={handleNextWeekMonth} aria-label="Semana siguiente">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Cuerpo del calendario */}
            <div className="cal-body">
                <Calendar
                    localizer={localizer}
                    events={normalizedEvents}
                    date={currentDate}
                    onNavigate={setCurrentDate}
                    view={view}
                    onView={setView}
                    toolbar={false}
                    min={new Date(0, 0, 0, 6, 0, 0)}
                    max={new Date(0, 0, 0, 23, 59, 0)}
                    scrollToTime={new Date(0, 0, 0, 6, 0, 0)}
                    components={{
                        event: PersonalizateEvent,
                        week: { header: renderDayHeader },
                        month: { header: renderDayHeader },
                    }}
                    formats={{
                        timeGutterFormat: (date) => format(date, "HH:mm"),
                        eventTimeRangeFormat: () => "",
                    }}
                    onSelectEvent={onEventClick}
                    culture="es"
                    messages={{
                        allDay: "Todo el día",
                        previous: "Anterior",
                        next: "Siguiente",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        noEventsInRange: "No hay eventos en este rango.",
                    }}
                    style={{ height: view === "month" ? 650 : "auto" }}
                    dayPropGetter={(date) => {
                        const today = new Date()
                        const isToday =
                            date.getDate() === today.getDate() &&
                            date.getMonth() === today.getMonth() &&
                            date.getFullYear() === today.getFullYear()
                        return isToday ? { className: "cal-today-col" } : {}
                    }}
                    slotPropGetter={() => ({ className: "cal-slot" })}
                    eventPropGetter={() => ({
                        style: {
                            background: "transparent",
                            border: "none",
                            padding: 0,
                        },
                    })}
                />
            </div>
        </div>
    )
}