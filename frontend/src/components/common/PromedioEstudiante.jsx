import React, { useState, useEffect } from 'react';
import '../../styles/common/Stats.css'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { useContext } from 'react'

export function PromedioEstudiante() {
    const { userLogin } = useContext(UserLoginContext)

    return (
        <div className="stats-content">
            <p>Promedio Estudiante</p>
            <h1>{userLogin?.promedio || 0}</h1>
            <p className="stats-resumen">top 5 en la clase</p>
        </div>
    );
}