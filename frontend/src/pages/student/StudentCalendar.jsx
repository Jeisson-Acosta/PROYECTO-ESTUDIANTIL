import React from "react";
import { CalendarClassCard } from "../../components/student/Calendarclasscard.jsx";
import { FullCalendario } from "../../components/common/charts/FullCalendario.jsx";
import { CurrentClassIcon, NextClassIcon, ViewScheduleIcon } from "../../components/common/charts/CalendarIcons.jsx";
import { ButtonCommon } from "../../components/common/ButtonCommon.jsx";    
import { useNavigate } from "react-router-dom";
import "../../styles/student/StudentCalendar.css";

export function StudentCalendar() {
    const navigate = useNavigate();
    const colorMatematicas = "#275ee1";
    const colorFisica = "#0FAB83";
    return (
        <div className="calendar-components">
            <div className="calendar-classes">
                <CalendarClassCard 
                    estado="Clase en curso" 
                    icon={<CurrentClassIcon />} 
                    nombre_clase="Matemática" 
                    salon="103" 
                    color={colorMatematicas}
                    coloricono={colorMatematicas + "40"}
                />
                <CalendarClassCard 
                    estado="Próxima clase" 
                    icon={<NextClassIcon />} 
                    nombre_clase="Física" 
                    salon="204" 
                    color={colorFisica}
                    coloricono={colorFisica + "40"}
                />
                
            </div>
            <div className="calendar-button">
                <ButtonCommon icon={<ViewScheduleIcon />} text="Ver Horario completo" onClick={() => navigate("/student/calendario/horario-completo")} />
            </div>
            <div className="calendar-calendar">
                <FullCalendario />
            </div>
            
        </div>
    );
}