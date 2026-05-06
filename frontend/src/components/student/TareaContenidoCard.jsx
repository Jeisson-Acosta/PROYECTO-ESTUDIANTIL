import React from 'react';
import { useContext, useState } from 'react';
import "../../styles/common/TareaContenido.css";
import { IconScore, IconSubject, IconModule, IconPDFRecourse, IconDOCXRecourse, IconLinkRecourse, IconOtherRecourse, IconUpload } from '../common/IconsContenidoClase';
import { UserLoginContext } from '../../context/userLogin.jsx'
import { UploadFile } from '../common/UploadFile.jsx';
import { GetRecourses } from '../common/classes/GetRecourses.jsx';

export function ContenidoCard({ tipo_trabajo }) {
  
  const { userLogin } = useContext(UserLoginContext) || {};
  const colorDeClase = userLogin?.color_clase 
  ? (userLogin.color_clase.startsWith('#') ? userLogin.color_clase : `#${userLogin.color_clase}`)
  : '#1f1f1f';
  console.log(colorDeClase)
  console.log('userLogin: ', userLogin.color_clase);
  const [entregaAnulada, setEntregaAnulada] = useState(false);
  

  const tareaEstadoActual = userLogin?.tarea_estado?.toLowerCase() || '';
  

  const isNotDelivered = tareaEstadoActual === 'no entregado';
  const isPending = tareaEstadoActual === 'entrega pendiente';
  const isDelivered = tareaEstadoActual === 'trabajo entregado';
  const isGraded = tareaEstadoActual === 'trabajo calificado';
  

  const effectiveIsPending = isPending || entregaAnulada;
  const effectiveIsDeliveredOrGraded = (isDelivered || isGraded) && !entregaAnulada;

  const handleDeliverButtonClick = () => {
    console.log('Entregando tarea...');
    setEntregaAnulada(false);
    // Aquí iría la lógica para entregar la tarea
  };

  const handleAnulateButtonClick = () => {
    console.log('Anulando entrega, ahora puedes volver a subir la tarea...');
    setEntregaAnulada(true);
    // Aquí iría la lógica para anular la entrega en el backend
  };

  const getButtonText = () => {
    if (effectiveIsPending) return 'Entregar tarea';
    return '';
  };

  console.log(userLogin)

  return (
    <div className="contenido-card">
      <div className='card-info-container'>
        {(userLogin?.tipo_trabajo === 'TA' || userLogin?.tipo_trabajo === 'MA') && (
          <>
            <h1>{userLogin.nombre_asignatura}</h1>
            <div className='tarea-parametros'>
              <div className='tarea-parametros-entrega'>
                <div className='tarea-parametros-entrega-icon'>
                  {/* Aquí va el icono */}
                </div>
                <div className='tarea-parametros-entrega-text'>
                  <h3>Fecha de entrega</h3>
                  <p>{userLogin.fecha_fin}</p>
                </div>
              </div>
              
              <div className='tarea-parametros-puntaje'>
                <div className='tarea-parametros-puntaje-icon'>
                  <IconScore />
                </div>
                <div className='tarea-parametros-puntaje-text'>
                  <h3>Puntaje</h3>
                  <p>{userLogin.puntaje_maximo || 100}</p>
                </div>
              </div>
              
              <div className='tarea-parametros-modulo'>
                <div className='tarea-parametros-modulo-icon'>
                  <IconModule />
                </div>
                <div className='tarea-parametros-modulo-text'>
                  <h3>Módulo</h3>
                  <p>{userLogin.nombre_asignatura}</p>
                </div>
              </div>
              {userLogin.tipo_trabajo === 'TA' && (
                <div style={{backgroundColor: userLogin.color_estado}} className='tarea-parametros-estado'>
                  <h3>{userLogin.tarea_estado}</h3>
                </div>
              )}
            </div>
          </>
        )}
        
        <div className='card-info-principal'>
          <div className='card-info'>
            {userLogin?.tipo_trabajo === 'EN' && (
              <div className='iconos-info'>
                <div className='icono-info-enunciado'>
                  <h3>Enunciado</h3>
                </div>
                <div className='icono-info-materia' style={{backgroundColor: `#${colorDeClase}`}}>
                  <div className='info-materia-icon'>
                    <IconSubject />
                  </div>
                  <h3>{userLogin.nombre_asignatura}</h3>
                </div>
              </div>
            )}
            
            <div className='card-info-titulo'>
              <h3>{userLogin?.nombre_trabajo}</h3>
              {userLogin?.tipo_trabajo === 'EN' && (
                <div className='card-info-profesor'>
                  <div className='card-info-profesor-icon'></div>
                  <div className='card-info-profesor-nombre'>
                    <h4>Prof. {userLogin.profesor_materia}</h4>
                  </div>
                </div>
              )}
            </div>
            
            <div className='card-info-descripcion'>
              <p>{userLogin?.descripcion_trabajo}</p>
            </div>
          </div>
          
          {(userLogin?.tipo_trabajo === 'TA' || userLogin?.tipo_trabajo === 'MA') && (
            <div className='card-contenido-extra'>
              <div className='contenido-extra-recursos'>
                <div className='recurso-item-titulo'>
                  <h3>Archivos Adjuntos</h3>
                </div>
                <GetRecourses />
              </div>
              
              {userLogin.tipo_trabajo === 'TA' && (
                <div className='entrega-seccion-completa'>
                  <div className='entrega-info-titulo'>
                    <h3>Tu entrega</h3>
                    <p>entrega tu trabajo antes de la fecha indicada</p>
                  </div>
                  
                  <div className='contenido-extra-entrega'>
                    <div className='entrega-info-subir-archivo'>
                      <UploadFile />
                    </div>
                    
                    {/* Botón No entregado - deshabilitado */}
                    {isNotDelivered && !entregaAnulada && (
                      <button 
                        className='entrega-tarea no-entregado' 
                        style={{backgroundColor: '#cccccc', color: '#666666', cursor: 'not-allowed'}}
                        disabled
                      >
                        No entregado
                      </button>
                    )}
                    
                    {/* Botón Entregar tarea - para estado pendiente o cuando se anula la entrega */}
                    {effectiveIsPending && (
                      <button 
                        className='entrega-tarea' 
                        style={{backgroundColor: colorDeClase, color: 'white', cursor: 'pointer'}}
                        onClick={handleDeliverButtonClick}
                      >
                        {getButtonText()}
                      </button>
                    )}
                    
                    {/* Botón Anular entrega - para estados entregado o calificado */}
                    {effectiveIsDeliveredOrGraded && (
                      <button 
                        className='entrega-tarea anular-entrega' 
                        style={{backgroundColor: '#999999', color: 'white', cursor: 'pointer'}}
                        onClick={handleAnulateButtonClick}
                      >
                        Anular entrega
                      </button>
                    )}
                    
                    {/* Mostrar calificación si existe y no se anuló */}
                    {userLogin.tarea_calificacion && userLogin.tarea_calificacion > 0 && !entregaAnulada && (
                      <div className='entrega-calificacion'>
                        <h3>Calificación <span>{userLogin.tarea_calificacion}</span>/{userLogin.puntaje_maximo || 100}</h3>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
  );
}