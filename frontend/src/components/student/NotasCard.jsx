
import React from "react";
import '../../styles/common/NotasCard.css';

export function NotasCard({ titulo, tarea, calificacion, color }) {
 const formatoColor = (color) => {
        if (!color) return '#cccccc';
        return `#${color}`;
    };

    const colorFinal = formatoColor(color);
    
    function obtenerTextoContraste() {
        return '#ffffff';
    }
    
    const gradeStyle = {
        backgroundColor: colorFinal,
        color: obtenerTextoContraste(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'fontSubtitles',
        padding: '2px',
    };
    
    const circleStyle = {
        backgroundColor: colorFinal,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
    };
    return (
        <div className="notas-card">
            <div classname ="materia-imagen" style={circleStyle}>
            </div>
            <div className="info-">
                <h1>{titulo}</h1>
                <p className="tarea">{tarea}</p>
            </div>
            <div className="grade-note" style={gradeStyle}>
                <p className="calificacion" style={{ margin: 0 }}>{calificacion}</p>
            </div>
        </div>
    );
}