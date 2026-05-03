import React from "react";
import "../../styles/common/classes/Calendar.css/CalendarClass.css";
import { LocationClassIcon } from "../common/charts/CalendarIcons";

export function CalendarClassCard({ estado, nombre_clase, salon, icon, color,coloricono }) {
    const defaultColor = "#e2e2e2ff";
    const bgColor = color || defaultColor;
    
    return (
        
        <section className="calendar-classes-cards" style={{ backgroundColor: color }}>
            <div className="calendar-classes-text">
                <header className='class-state'>
                    <h4>{estado}</h4>
                </header>
                <div className='class-name'>
                    <span>{nombre_clase}</span>
                </div>
                <footer className="class-room">
                    <LocationClassIcon />
                    <p>{salon}</p>
                </footer>    
            </div> 
            <div className="class-icon" style={{ backgroundColor:coloricono }}>
                {icon}
            </div>
        </section>
    );
}