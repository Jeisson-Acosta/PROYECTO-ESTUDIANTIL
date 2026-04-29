import React from "react";
import { CalendarClassCard } from "../../components/student/Calendarclasscard.jsx";
import { FullCalendario } from "../../components/common/charts/FullCalendario.jsx";
import { CurrentClassIcon,NextClassIcon } from "../../components/common/charts/CalendarIcons.jsx";
import "../../styles/student/StudentCalendar.css";

export function StudentCalendar() {
    return (
        <div className="calendar-components">
            <div className='calendar-classes'>
                <div className="calendar-classes-cards"><CalendarClassCard estado={"Clase actual"} icon={<CurrentClassIcon/>} nombre_clase={"Matematica"} salon={"103"} /></div>
                <div className="calendar-classes-cards"><CalendarClassCard estado={"Próxima clase"} icon={<NextClassIcon/>} nombre_clase={"Fisica"} salon={"204"} /></div>
                 <button className="btn-view-all-classes">
                <h3>Ver Horario completo</h3>
                <p>Gestionar Clases</p>
            </button>
            </div>
            <div className="calendar-calendar">
                <FullCalendario />
            </div>
           
        </div>
    );
}
