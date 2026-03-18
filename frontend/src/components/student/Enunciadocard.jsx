import React from 'react'

export function Enunciadocard() {
    return (
        <div className='contenido-enunciado'>
            <div className='enunciado-info'>
                <div className='enunciado pestañas'>
                    <div className='pestaña-enunciado'><h5>Enunciado</h5></div>
                    <div className='pestaña-enunciado'><h5>Materia</h5></div>
                </div>
                <h1>Titulo</h1>
                <h3>Informacion</h3>
            <div className='enunciado-comentarios'>
                <h3>Comentarios</h3>
            </div>
            </div>

            <div className='enunciado-extra'>
                <div className='enunciado-recursos'>
                 <h3>Archivos Adjuntos</h3>
                </div>
                <div className='enunciado-fechas'>
                 <h3>Fechas clave</h3>
     
                </div>
            </div>
        </div>
    )
}