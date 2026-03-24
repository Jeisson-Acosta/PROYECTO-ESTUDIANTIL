import React from 'react';
import { useContext } from 'react';
import "../../styles/common/TareaContenido.css";
import { IconScore, IconSubject, IconModule, IconPDFRecourse, IconDOCXRecourse, IconLinkRecourse, IconOtherRecourse, IconUpload } from '../common/IconsContenidoClase';
import { UserLoginContext } from '../../context/userLogin.jsx';
export function ContenidoCard({ tipo_trabajo, nombre_materia, nombre_trabajo,descripcion_trabajo, fecha_inicio, fecha_fin,tarea_estado,tarea_calificacion }) {
  // Campos que COMPARTEN todos los tipos
  const materia = "Matemáticas";
  const modulo = "Módulo 1";
  const { userLogin } = useContext(UserLoginContext) || {};
  
  return (
    <div className="contenido-card">
          <div className='card-info-container'>
      {(userLogin.tipo_trabajo === 'TA' || userLogin.tipo_trabajo === 'MA') && (
        <>
          <h1>{userLogin.nombre_asignatura}</h1>
          <div className='tarea-parametros'>
            <div className='tarea-parametros-entrega'>
              <div className='tarea-parametros-entrega-icon'>
                {/* Aquí va el icono */}
              </div>
              <div className='tarea-parametros-entrega-text'>
                <h3>Fecha de entrega</h3>
                <p>{userLogin.fecha_inicio && userLogin.fecha_fin 
    ? `${formatDate(userLogin.fecha_inicio)} - ${formatDate(userLogin.fecha_fin)}` 
    : 'Sin límite'}</p>
              </div>
            </div>
            
            <div className='tarea-parametros-puntaje'>
              <div className='tarea-parametros-puntaje-icon'>
                <IconScore />
              </div>
              <div className='tarea-parametros-puntaje-text'>
                <h3>Puntaje</h3>
                <p>100</p>
              </div>
            </div>
            
            <div className='tarea-parametros-modulo'>
              <div className='tarea-parametros-modulo-icon'>
                <IconModule />
              </div>
              <div className='tarea-parametros-modulo-text'>
                <h3>Módulo</h3>
                <p>{modulo}</p>
              </div>
            </div>
            <div className='tarea-parametros-estado'>
              <h3>{userLogin.tarea_Estado}</h3>
            </div>
          </div>
        </>
      )}
      <div className='card-info-principal'>
      <div className='card-info'>
       {userLogin.tipo_trabajo === 'EN' && (
        <div className='iconos-info'>
          <div className='icono-info-enunciado'>
            <h3>Enunciado</h3>
          </div>
          <div className='icono-info-materia'>
            <div className='info-materia-icon'>
            <IconSubject />
            </div>
            <h3>{userLogin.nombre_asignatura}</h3>
          </div>
        </div>
      )}
      
      <div className='card-info-titulo'>
        <h3>{userLogin.nombre_trabajo}</h3>
        {userLogin.tipo_trabajo === 'EN' && (
        <div className='card-info-profesor'>
         <div className='card-info-profesor-icon'></div>
         <div className='card-info-profesor-nombre'>
           <h4>nombre_profesor</h4>
         </div>
        </div>
      )}
      </div>
      <div className='card-info-descripcion'>
        <p>{userLogin.descripcion_trabajo}</p>
      </div>
      </div>
    
        {(userLogin.tipo_trabajo === 'TA' || userLogin.tipo_trabajo === 'MA') && (
  <div className='card-contenido-extra'>
    <div className='contenido-extra-recursos'>
      <div className='recurso-item-titulo'>
        <h3>Archivos Adjuntos</h3>
      </div>
      <div className='recursos-lista'>
        <div className='recurso-item'>
          <div className='recurso-item-icon'>
            <IconPDFRecourse />
          </div>
          <div className='recurso-item-text'>
            <h4> Nombre del archivo</h4>
            <p>Tamaño del archivo</p>
          </div>
        </div>
      </div>
    </div>
    
    {userLogin.tipo_trabajo === 'TA' && (
   <div className='entrega-seccion-completa'>
  <div className='entrega-info-titulo'>
    <h3>Tu entrega</h3>
    <p>entrega tu trabajo antes de la fecha indicada</p>
  </div>
  
  <div className='contenido-extra-entrega'>
    <div className='entrega-info-subir-archivo'>
      <label className='entrega-info-subir-archivo-btn'>
        <div className='entrega-info-subir-archivo-icon'>
          <IconUpload />
        </div>
        <div className='entrega-info-subir-archivo-text'>
          <h3>haz click para subir</h3>
          <p>o arrastra y suelta el archivo</p>
          <p>max 100mb</p>
        </div>
      </label>
    </div>
    <button className='entrega-tarea' style ={{color: userLogin.color}}>Entregar tarea</button>
      <div className='entrega-calificacion'>
      <h3>Calificación <span>100</span>/100</h3>
  </div>
  </div>

</div>
    )}
    
  </div>
  
)}
</div>
      {tipo_trabajo === 'EN' && (
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
      

      
     
      
      
    </div>
  );
}