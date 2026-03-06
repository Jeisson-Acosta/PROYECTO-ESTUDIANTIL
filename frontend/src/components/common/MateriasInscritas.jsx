import React, { useState, useEffect } from 'react';
import '../../styles/common/Stats.css'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { useContext } from 'react'

export function MateriasInscritas() {
    const { userLogin } = useContext(UserLoginContext)

    return (
        <div className="stats-content">
            <p>Materias Inscritas</p>
            <h1>5</h1>
            <p className="stats-resumen">+2 en este ciclo</p>
        </div>
    );
}