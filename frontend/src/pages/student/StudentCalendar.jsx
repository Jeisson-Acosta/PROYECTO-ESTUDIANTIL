import React from "react";
import { CalendarClassCard } from "../../components/student/Calendarclasscard.jsx";
import { FullCalendario } from "../../components/common/charts/FullCalendario.jsx";
import { CurrentClassIcon, NextClassIcon } from "../../components/common/charts/CalendarIcons.jsx";
import "../../styles/student/StudentCalendar.css";

export function StudentCalendar() {
    return (
        <div className="calendar-components">
            <div className="calendar-classes">
                <CalendarClassCard 
                    estado="Clase actual" 
                    icon={<CurrentClassIcon />} 
                    nombre_clase="Matemática" 
                    salon="103" 
                />
                <CalendarClassCard 
                    estado="Próxima clase" 
                    icon={<NextClassIcon />} 
                    nombre_clase="Física" 
                    salon="204" 
                />
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