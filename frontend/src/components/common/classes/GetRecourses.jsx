import React from "react";
import { useContext } from "react";
import { UserLoginContext } from "../../../context/userLogin";
import { IconLinkRecourse, IconOtherRecourse } from "../IconsContenidoClase";
import "../../../styles/common/classes/GetRecourses.css";

export function GetRecourses() {
    const { userLogin } = useContext(UserLoginContext) || {};
    const recursosRaw = userLogin?.trabajo_recursos;
    
    let recursos = [];
    if (recursosRaw) {
        try {
            let parsed = recursosRaw;
            if (typeof recursosRaw === 'string') {
                let cleanStr = recursosRaw;
                if (cleanStr.startsWith("'") && cleanStr.endsWith("'")) {
                    cleanStr = cleanStr.slice(1, -1);
                }
                parsed = JSON.parse(cleanStr);
            }
            recursos = Array.isArray(parsed) ? parsed : [parsed];
            recursos = recursos.filter(r => r?.nombre_recurso);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    if (recursos.length === 0) {
        return <p className="recursos-vacio">No hay recursos</p>;
    }
    
    const getIcon = (tipo) => {
        return tipo?.toUpperCase() === 'L' ? <IconLinkRecourse /> : <IconOtherRecourse />;
    };
    
    return (
        <div className="recursos-lista" style={{gap: '10px'}}>
            {recursos.map((recurso, i) => (
                <div key={i} className="recurso-item">
                    <div className="recurso-item-icon">
                        {getIcon(recurso.tipo_recurso)}
                    </div>
                    <div className="recurso-item-text">
                        <h4>{recurso.nombre_recurso}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}