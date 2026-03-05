// common/Stats.jsx
import React, { useContext } from 'react'
import '../../styles/common/Stats.css'
import { MateriasInscritas } from './MateriasInscritas.jsx'
import { PromedioEstudiante } from './PromedioEstudiante.jsx'
import { Inasistencias } from './Inasistencias.jsx'
import { UserLoginContext } from '../../context/userLogin.jsx'

export function Stats() {
    const { userLogin } = useContext(UserLoginContext) || {};
    
    console.log('📊 Stats - userLogin:', userLogin);
    
    const total_materias = userLogin?.data[1]?.total_materias ?? 0;
    const promedio = userLogin?.data[1]?.promedio ?? 'Sin Promedio';
    const total_inasistencias = userLogin?.data[1]?.total_inasistencias ?? 0;

    console.log('📊 Stats - valores:', { total_materias, promedio, total_inasistencias });

    return (
        <div className="principal-content">
            <MateriasInscritas total_materias={total_materias} />
            <PromedioEstudiante promedio={promedio} />
            <Inasistencias total_inasistencias={total_inasistencias} />
        </div>
    )
}