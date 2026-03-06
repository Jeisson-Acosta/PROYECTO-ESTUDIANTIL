// common/Stats.jsx
import React, { useContext } from 'react'
import '../../styles/common/Stats.css'
import { MateriasInscritas } from './MateriasInscritas.jsx'
import { PromedioEstudiante } from './PromedioEstudiante.jsx'
import { Inasistencias } from './Inasistencias.jsx'
import { UserLoginContext } from '../../context/userLogin.jsx'

export function Stats() {
    const { userLogin } = useContext(UserLoginContext) || {};
    
    
   // const total_materias = userLogin.total_materias;
    //const promedio = userLogin.promedio;
    //const total_inasistencias = userLogin.total_inasistencias;


    return (
        <div className="principal-content">
            <MateriasInscritas  />
            <PromedioEstudiante  />
            <Inasistencias  />
        </div>
    ) 
}