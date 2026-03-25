import React from "react";
import '../../styles/common/NotasCard.css';

export function NotasCard({ titulo, tarea, calificacion, color, color_nota }) {
    const formatoColor = (color_nota) => {
        if (!color_nota) return '#cccccc';
        // Si el color ya viene con #, lo dejamos igual
        // Si no tiene #, se lo agregamos
        return color_nota.startsWith('#') ? color_nota : `#${color_nota}`;
    };
    

    const colorFinal = formatoColor(color_nota);
    
    // Función mejorada para calcular contraste (texto blanco o negro según fondo)
    function obtenerTextoContraste(hexcolor) {
        // Si no hay color, retornar negro
        if (!hexcolor) return '#000000';
        
        // Convertir hex a RGB
        let r, g, b;
        if (hexcolor.startsWith('#')) {
            const hex = hexcolor.substring(1);
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else {
            return '#000000';
        }
        
        // Calcular luminancia (fórmula de contraste W3C)
        const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Si la luminancia es mayor a 0.5, usar texto negro, si no, blanco
        return luminancia > 0.5 ? '#000000' : '#ffffff';
    }
    
    const gradeStyle = {
     backgroundColor: colorFinal,
    color: '#1a365d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    fontSize: '14px', // Reducido de 16px a 14px
    padding: '2px 4px',
    fontFamily: 'fontTitlesBold', // Agregar la fuente aquí
    width: '40px',
    height: '20px',
    };
    
    const circleStyle = {
        backgroundColor: colorFinal,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    return (
        <div className="notas-card">
            <div className="materia-imagen" style={circleStyle}>
                {/* Aquí puedes poner contenido si quieres, como iniciales de la materia */}
            </div>
            <div className="info-materia">  {/* Cambiado de "info-" a "info-materia" */}
                <h1>{titulo}</h1>
                <p className="tarea">{tarea}</p>
            </div>
            <div className="grade-note" style={gradeStyle}>
                <p className="calificacion" style={{ margin: 0 }}> {typeof calificacion === 'number' ? calificacion.toFixed(1) : calificacion}</p>
            </div>
        </div>
    );
}