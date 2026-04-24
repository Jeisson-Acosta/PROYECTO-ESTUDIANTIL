import { useState } from "react"
import { CirclePlus, CloseIcon, BookVocabularyIcon} from "../common/GeneralIcons.jsx"
import "../../styles/docent/AssignNewClass.css"

const BG_DISTINTIVE_COLORS=["3b82f6","10b981","ec5b13","a855f7","f59e0b"]
const express = require('express');
const cors = require('cors');
const app = express();

export function AssignNewClass(){
    const[showModalAssignNewClass,setShowModalAssignNewClass] = useState(false)
    const handleClickManageModalAssignNewClass = ()=>{setShowModalAssignNewClass(!showModalAssignNewClass)}
    return(
        <>
            <div
                style={{position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 998}}
                onClick={handleClickManageModalAssignNewClass}
            ></div>
            <section className="container-principal-assign-new-class" >
                <header className="header-modal-assign-new-class">
                    <div className="container-left">
                        <div className="icon">
                            <CirclePlus/>
                        </div>
                        <div className="info-header">
                            <h1>Asignar Nueva Clase</h1>
                            <p>Configura los detalles de la nueva asignatura</p>
                        </div>
                    </div>
                    <button>
                        <CloseIcon/>
                    </button>
                </header>
                <section className="container-info-modal">
                    <div className="materia-identidad">
                        <div className="title-section-modal">
                            <BookVocabularyIcon/>
                            <h4>MATERIA E IDENTIDAD</h4>
                        </div>
                        <div className="container-fields">
                            <div className="field">
                                <label htmlFor="category">
                                    Seleccionar Materia
                                </label>
                                <select>
                                    <option value={null} disabled selected>Buscar Materia...</option>
                                    <option value="">Matematicas</option>
                                    <option value="">Ingles</option>
                                    <option value="">Español</option>
                                    <option value="">Sociales</option>
                                    <option value="">EDU.Fisica</option>
                                    <option value="">Ciencias</option>
                                    <option value="">Comunicacion</option>
                                    <option value="">Fisica</option>
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="category">
                                        Color Distintivo
                                </label>
                                <div className="container-distintive-colors">
                                    {BG_DISTINTIVE_COLORS.map(background =>(
                                        <div className="distintive-color-item" style={{backgroundColor:`#${background}`}}></div>
                                    ))}

                                </div>
                            <div className="title-section-ubicacion">
                                <label htmlFor="">
                                    <h4>UBICACION Y SALON</h4>
                                </label>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

        </>
        
    )
}