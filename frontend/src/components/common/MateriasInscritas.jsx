import React, { useState, useEffect } from 'react';
import '../../styles/common/Stats.css'


export function MateriasInscritas({total_materias = 0}) {


    return (
        <div className="stats-content">
            <p>Materias Inscritas</p>
            <h1>{total_materias}</h1>
        </div>
    );
}