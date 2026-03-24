import React from 'react'
import { useContext } from 'react';
import { UserLoginContext } from '../../context/userLogin.jsx'
import {ContenidoCard} from '../../components/student/TareaContenidoCard.jsx'
 export  function ContenidoClase() {
    const { userLogin } = useContext(UserLoginContext) || {};
    return (
    <div>
        <ContenidoCard tipo={userLogin.tipo_trabajo} />
    </div>
    )
}