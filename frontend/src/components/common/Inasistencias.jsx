import React, { useState, useEffect } from 'react';
import '../../styles/common/Stats.css'

export function Inasistencias({total_inasistencias = 0}) {


    return (
        <div className="stats-content">
            <p>Inasistencias</p>
            <h1>{total_inasistencias}</h1>
        </div>
    );
}