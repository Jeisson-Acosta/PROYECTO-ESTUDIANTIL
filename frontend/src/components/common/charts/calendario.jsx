import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import '../../../styles/common/charts/Calendar.css'
import { useContext, useEffect, useRef } from 'react'
import { UserLoginContext } from '../../../context/userLogin'

export function Calendar() {
  const { userLogin } = useContext(UserLoginContext)
  const calendarRef = useRef(null)
  const proximos_eventos = userLogin.proximos_eventos
  
  const calendarEvents = Array.isArray(proximos_eventos) 
    ? proximos_eventos.map(evento => ({
        title: evento.nombre_trabajo,
        start: evento.fecha_fin.split(' ')[0],
        color: `#${evento.color_materia.color}`,
        display: 'background',
      }))
    : []

  useEffect(() => {
    if (calendarEvents.length > 0 && calendarRef.current) {
      setTimeout(() => {
        calendarEvents.forEach(event => {
          const date = event.start
          const cells = document.querySelectorAll(`.fc-daygrid-day`)
          cells.forEach(cell => {
            const cellDate = cell.getAttribute('data-date')
            if (cellDate === date) {
              cell.setAttribute('data-has-event', 'true')
              cell.style.setProperty('--event-color', event.color)
            }
          })
        })
      }, 200)
    }
  }, [calendarEvents])

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        events={calendarEvents}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'title',  
          center: '',     
          right: 'prev,next'            
        }}
        titleFormat={{ year: 'numeric', month: 'long' }}
        height="auto"
        showNonCurrentDates={false}
        dayMaxEvents={false}
        fixedWeekCount={false}
        locale={esLocale}
        buttonText={{
          prev: '‹',
          next: '›',
        }}
        datesSet={() => {
          setTimeout(() => {
            calendarEvents.forEach(event => {
              const date = event.start
              const cells = document.querySelectorAll(`.fc-daygrid-day`)
              cells.forEach(cell => {
                const cellDate = cell.getAttribute('data-date')
                if (cellDate === date) {
                  cell.setAttribute('data-has-event', 'true')
                  cell.style.setProperty('--event-color', event.color)
                }
              })
            })
          }, 100)
        }}
      />
    </div>
  )
}