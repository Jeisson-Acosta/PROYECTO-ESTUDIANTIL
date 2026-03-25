import React from "react";
import '../../styles/common/NotasCard.css'
export function NotasCard({titulo,tarea,calificacion}){
return(
    <div className="notas-card">
        <div className="info-">
             <h1>{titulo}</h1>
             <p>{tarea}</p>
        </div>
        <div className="grade-note">
         <p className="calificacion">{calificacion}</p>
        </div>
        
        
    </div>
)

}