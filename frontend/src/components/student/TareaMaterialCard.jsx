import React from 'react';
import "../../styles/common/TareaMaterialCard.css";

export function ContenidoCard({ tipo }) {
  // Campos que COMPARTEN todos los tipos
  const materia = "Matemáticas";
  const modulo = "Módulo 1";
  
  return (
    <div className="contenido-card">
          <div className='card-info-container'>
      {/* SECCIÓN 1: PARÁMETROS (tarea y material) */}
      {(tipo === 'tarea' || tipo === 'material') && (
        <>
          <h1>Ecuaciones Cuadraticas</h1>
          <div className='tarea-parametros'>
            <div className='tarea-parametros-entrega'>
              <div className='tarea-parametros-entrega-icon'>
                {/* Aquí va el icono */}
              </div>
              <div className='tarea-parametros-entrega-text'>
                <h3>Fecha de entrega</h3>
                <p>17/03 - 24/03</p>
              </div>
            </div>
            
            <div className='tarea-parametros-puntaje'>
              <div className='tarea-parametros-puntaje-icon'>
                {/* Aquí va el icono */}
              </div>
              <div className='tarea-parametros-puntaje-text'>
                <h3>Puntaje</h3>
                <p>100</p>
              </div>
            </div>
            
            <div className='tarea-parametros-modulo'>
              <div className='tarea-parametros-modulo-icon'>
                {/* Aquí va el icono */}
              </div>
              <div className='tarea-parametros-modulo-text'>
                <h3>Módulo</h3>
                <p>{modulo}</p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* SECCIÓN 2: PESTAÑAS (solo enunciado) */}
     
      
      {/* SECCIÓN 3: TÍTULO Y DESCRIPCIÓN (TODOS los tipos) */}

      <div className='card-info'>
       {tipo === 'enunciado' && (
        <div className='iconos-info'>
          <div className='icono-info-enunciado'>
            <h3>Enunciado</h3>
          </div>
          <div className='icono-info-materia'>
            <h3>Materia</h3>
          </div>
        </div>
      )}
      <div className='card-info-titulo'>
        <h3>Título</h3>
      </div>
      <div className='card-info-descripcion'>
        <p>Descripción</p>
      </div>
      </div>
      
      {/* SECCIÓN 4: COMENTARIOS (solo enunciado) */}
      {tipo === 'enunciado' && (
        <div className='card-enunciado-comentarios'>
          <h3>Comentarios</h3>
          <div className='comentario-info'>
            <div className='comentario-info-icon'></div>
            <div className='comentario-info-text'>
              <div className='comentario-info-text-header'>
                <h3>Nombre</h3>
                <h3>cargo</h3>
                <p>Fecha</p>
              </div>
              <p>Comentario del estudiante</p>
            </div>
          </div>
        </div>
      )}
      </div>
      
      {/* SECCIÓN 5: RECURSOS (tarea y material) */}
      {(tipo === 'tarea' || tipo === 'material') && (
        <div className='card-contenido-extra'>
          <div className='contenido-extra-recursos'>
            <h3>Archivos Adjuntos</h3>
            <div className='recursos-lista'>
              <div className='recurso-item'>
                <div className='recurso-item-icon'></div>
                <div className='recurso-item-text'>
                  <h3>Nombre del archivo</h3>
                  <p>Tamaño del archivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* SECCIÓN 6: ENTREGA (solo tarea) */}
      {tipo === 'tarea' && (
        <div className='card-contenido-extra'>
          <div className='contenido-extra-entrega'>
            <div className='entrega-info-titulo'>
              <h3>Tu entrega</h3>
              <p>entrega tu trabajo antes de la fecha indicada</p>
            </div>
            <div className='entrega-info-subir-archivo'>
              <button>
                <div className='entrega-info-subir-archivo-icon'></div>
                <div className='entrega-info-subir-archivo-text'>
                  <h3>Nombre del archivo</h3>
                  <p>Tamaño del archivo</p>
                </div>
              </button>
            </div>
            <button className='entrega-tarea'>Entregar tarea</button>
          </div>
        </div>
      )}
      
      
    </div>
  );
}