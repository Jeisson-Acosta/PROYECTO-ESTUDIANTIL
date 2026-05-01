import { useState, useEffect } from 'react';
import '../../styles/common/DateSelector.css';

// Iconos inline para no depender de librerías externas
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const CalendarIconLocal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

export function DateSelector({ onChangeDate, initialDate }) {
    // Para evitar desfases de zona horaria, si viene fecha agregamos T00:00:00 para forzar hora local
    const [currentDate, setCurrentDate] = useState(() => {
        if (!initialDate) return new Date();
        return initialDate.includes('T') ? new Date(initialDate) : new Date(`${initialDate}T00:00:00`);
    });

    // Cada vez que cambia la fecha internamente, se la enviamos al padre en formato YYYY-MM-DD
    useEffect(() => {
        if (onChangeDate) {
            // Formatear a YYYY-MM-DD
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            onChangeDate(formattedDate);
        }
    }, [currentDate]);

    // Función flecha izquierda (restar 1 día)
    const prevDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    // Función flecha derecha (sumar 1 día)
    const nextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);
    };

    const handleInputDateChange = (e) => {
        if (!e.target.value) return;
        setCurrentDate(new Date(`${e.target.value}T00:00:00`));
    };

    // Formatear pra ver el texto bonito EJ: ("Hoy, 25 Sep 2025")
    const formatDateText = (date) => {
        const today = new Date();
        const isToday = 
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        const options = { day: 'numeric', month: 'short', year: 'numeric' };

        // Ejemplo de salida: "25 sept 2025"
        let dateStr = date.toLocaleDateString('es-ES', options);

        // Ponemos la primera letra del mes en mayúscula
        dateStr = dateStr.replace(/\b[a-z]/g, (char) => char.toUpperCase());

        return isToday ? `Hoy, ${dateStr}` : dateStr;
    };

    // Formato requerido para el value del <input type="date">
    const inputValue = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    return (
        <div className="date-selector-container">
            <button onClick={prevDay} className="arrow-btn-date">
                <ChevronLeftIcon />
            </button>

            <div className="date-display-center">
                <CalendarIconLocal />
                <span>{formatDateText(currentDate)}</span>
                
                {/* El input nativo invisible que hace la magia de abrir el calendario */}
                <input 
                    type="date" 
                    className="hidden-date-input"
                    value={inputValue}
                    onChange={handleInputDateChange}
                />
            </div>

            <button onClick={nextDay} className="arrow-btn-date">
                <ChevronRightIcon />
            </button>
        </div>
    );
}
