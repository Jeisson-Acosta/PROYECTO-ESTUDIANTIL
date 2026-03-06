import React, { useState, useEffect } from 'react';
import '../../styles/common/Stats.css'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { useContext } from 'react'

export function Inasistencias() {
    const { userLogin } = useContext(UserLoginContext)

    return (
        <div className="stats-content">
            <p>Inasistencias</p>
            <h1>2</h1>
            <p className="stats-resumen">98% asistencia total</p>
        </div>
    );
}