import React from 'react';
import '../../styles/common/MateriasCard.css';

export function MateriasCard({titulo, aula, hora, profesor, color}) {
    // Estilo dinámico para el borde izquierdo de la tarjeta
    const cardStyle = {
        borderLeft: `4px solid #${color || 'cccccc'}` 
    };
    
    // Estilo para el círculo de color
    const circleStyle = {
        backgroundColor: `#${color || 'cccccc'}`,
        width: '20px', 
        height: '20px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '8px'
    };
    
    return (
        <div className='materias-card' style={cardStyle}>
            <div className='title-subject'>
                <h1>{titulo}</h1>
                <p className='hora'>{hora}</p>
            </div>
            <div className='room-subject'>
                <p>{aula}</p>
            </div>
            <div className='teacher-subject'>
                <div className="materia-imagen" style={circleStyle}></div>
                <p>{profesor}</p>
            </div>
        </div>
    );
}