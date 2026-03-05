import React, { useState, useEffect } from 'react';
import '../../styles/common/Stats.css'

export function PromedioEstudiante({promedio = 0}) {


    return (
        <div className="stats-content">
            <p>Promedio Estudiante</p>
            <h1>{promedio}</h1>
        </div>
    );
}