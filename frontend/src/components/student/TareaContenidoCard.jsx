import { useContext, useState } from 'react';
import "../../styles/common/TareaContenido.css"
import { IconScore, IconSubject, IconLinkRecourse } from '../common/IconsContenidoClase';
import { UserLoginContext } from '../../context/userLogin.jsx'
import { UploadFile } from '../common/UploadFile.jsx';
import { DocxIcon, DownloadIcon, ExternalLinkIcon, PdfIcon, PhotoIcon } from '../common/GeneralIcons.jsx';
import { AttachmentsFiles } from '../common/classes/AttachmentsFiles.jsx';

export function ContenidoCard({ info_resource }) {

  console.log(info_resource)

  const { userLogin } = useContext(UserLoginContext) || {};
  const colorDeClase = userLogin?.color_clase ? (userLogin.color_clase.startsWith('#') ? userLogin.color_clase : `#${userLogin.color_clase}`) : '#1f1f1f';
  const [entregaAnulada, setEntregaAnulada] = useState(false);
  
  const tareaEstadoActual = userLogin?.tarea_estado?.toLowerCase() || '';

  const isNotDelivered = tareaEstadoActual === 'no entregado';
  const isPending = tareaEstadoActual === 'entrega pendiente';
  const isDelivered = tareaEstadoActual === 'trabajo entregado';
  const isGraded = tareaEstadoActual === 'trabajo calificado';
  

  const effectiveIsPending = isPending || entregaAnulada;
  const effectiveIsDeliveredOrGraded = (isDelivered || isGraded) && !entregaAnulada

  const resourcesDocent = info_resource.resources?.filter(resource => resource.created_by === 'DOC')
  const resourcesStudent = info_resource.resources?.filter(resource => resource.created_by === 'EST')

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

  return (
    <div className="contenido-card">
      <div className='card-info-container'>
        {(info_resource.asttip === 'TA' || info_resource.asttip === 'MA') && (
          <>
            <h1>{info_resource.astnomtrabajo}</h1>
            <div className='tarea-parametros'>
              <div className='tarea-parametros-entrega'>
                <div className='tarea-parametros-entrega-icon'>
                  {/* Aquí va el icono */}
                </div>
                <div className='tarea-parametros-entrega-text'>
                  <h3>Fecha de entrega</h3>
                  <p>{info_resource.astfecfin}</p>
                </div>
              </div>
              
              <div className='tarea-parametros-puntaje'>
                <div className='tarea-parametros-puntaje-icon'>
                  <IconScore />
                </div>
                <div className='tarea-parametros-puntaje-text'>
                  <h3>PUNTAJE MAXIMO</h3>
                  <p>{info_resource.astpunt_max || 0} Puntos</p>
                </div>
              </div>

              {info_resource.asttip === 'TA' && (
                <div 
                  style={{
                    backgroundColor: (info_resource.ateestado === 'C' ? '#e7f8f2' :
                    info_resource.ateestado === 'E' ? '#e7f8f2' :
                    info_resource.ateestado === 'P' ? '#fef9c3' :
                    info_resource.ateestado === 'D' ? '#fee2e2' : '#f5babaff')
                  }} 
                  className='tarea-parametros-estado'
                >
                  <h3 style={{
                    color: (info_resource.ateestado === 'C' ? '#2d7d4d' :
                    info_resource.ateestado === 'E' ? '#2d7d4d' :
                    info_resource.ateestado === 'P' ? '#7d6f00' :
                    info_resource.ateestado === 'D' ? '#7d2d2d' : '#7d2d2d')
                  }}>
                    {info_resource.ateestado === 'C' && 'Calificado'}
                    {info_resource.ateestado === 'E' && 'Entregado'}
                    {info_resource.ateestado === 'P' && 'Pendiente'}
                    {info_resource.ateestado === 'D' && 'Devuelto'}
                  </h3>
                </div>
              )}
            </div>
          </>
        )}
        
        <div className='card-info-principal'>
          <div className='card-info'>
            {info_resource.asttip === 'EN' && (
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
              <h3>Detalles de la tarea</h3>
            </div>
            
            <div className='card-info-descripcion'>
              <p>{info_resource.astdesctrabajo}</p>
            </div>
          </div>
          
          {(info_resource.asttip === 'TA' || info_resource.asttip === 'MA') && (
            <div className='card-contenido-extra'>
              <div className='contenido-extra-recursos'>
                <div className='recurso-item-titulo'>
                  <h3>Archivos Adjuntos</h3>
                </div>
                {resourcesDocent && <AttachmentsFiles resources={resourcesDocent} />}
              </div>
              
              {info_resource.asttip === 'TA' && (
                <div className='entrega-seccion-completa'>
                  <div className='entrega-info-titulo'>
                    <h3>Tu entrega</h3>
                    <p>Sube tus archivos antes de la fecha limite.</p>
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
      
      {info_resource.asttip === 'EN' && (
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