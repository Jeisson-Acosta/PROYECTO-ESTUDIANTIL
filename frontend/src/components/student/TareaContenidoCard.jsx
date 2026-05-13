import { useContext, useState } from 'react';
import "../../styles/common/TareaContenido.css"
import { IconScore, IconSubject } from '../common/IconsContenidoClase';
import { UserLoginContext } from '../../context/userLogin.jsx'
import { UploadFile } from '../common/UploadFile.jsx';
import {  SendIcon } from '../common/GeneralIcons.jsx';
import { AttachmentsFiles } from '../common/classes/AttachmentsFiles.jsx';

export function ContenidoCard({ info_resource }) {
  const { userLogin } = useContext(UserLoginContext) || {};
  const [entregaAnulada, setEntregaAnulada] = useState(false);

  const resourcesDocent = info_resource.resources?.filter(resource => resource.created_by === 'DOC')
  const resourcesStudent = info_resource.resources?.filter(resource => resource.created_by === 'EST')

  const isTask = info_resource.asttip === 'TA';
  const isEnouncement = info_resource.asttip === 'EN';
  const isMaterial = info_resource.asttip === 'MA';

  return (
    <div className="contenido-card">
      <div className="contenido-principal">
        {/* Cabecera para Enunciado/Material */}
        {(isEnouncement || isMaterial) && (
          <div className="header-chips">
            <span className="chip-tipo">{isEnouncement ? 'ENUNCIADO' : 'MATERIAL'}</span>
            <span className="chip-materia">
              <IconSubject /> {userLogin.nombre_asignatura}
            </span>
            <span className="fecha-publicacion">Publicado: {info_resource.astfecini || 'Pronto'}</span>
          </div>
        )}

        <h1 className="titulo-trabajo">{info_resource.astnomtrabajo}</h1>

        {/* Cabecera para Tarea */}
        {isTask && (
          <div className='tarea-parametros'>
            <div className='tarea-parametro-item'>
              <div className='tarea-parametro-text'>
                <h3>FECHA DE ENTREGA</h3>
                <p>{info_resource.astfecfin || 'Sin fecha'}</p>
              </div>
            </div>
            
            <div className='tarea-parametro-item'>
              <div className='tarea-parametros-puntaje-icon'>
                <IconScore />
              </div>
              <div className='tarea-parametro-text'>
                <h3>PUNTAJE MÁXIMO</h3>
                <p>{info_resource.astpunt_max || 100} Puntos</p>
              </div>
            </div>

            <div className='tarea-parametro-item'>
              <div className='tarea-parametro-text'>
                <h3>MÓDULO</h3>
                <p>{userLogin.nombre_asignatura || 'General'}</p>
              </div>
            </div>

            <div 
              className='tarea-parametro-estado-chip'
              style={{
                backgroundColor: (info_resource.ateestado === 'C' ? '#e7f8f2' :
                info_resource.ateestado === 'E' ? '#e7f8f2' :
                info_resource.ateestado === 'P' ? '#fef9c3' :
                info_resource.ateestado === 'D' ? '#fee2e2' : '#f5babaff'),
                color: (info_resource.ateestado === 'C' ? '#2d7d4d' :
                info_resource.ateestado === 'E' ? '#2d7d4d' :
                info_resource.ateestado === 'P' ? '#7d6f00' :
                info_resource.ateestado === 'D' ? '#7d2d2d' : '#7d2d2d')
              }} 
            >
              <div className="estado-dot" style={{backgroundColor: 'currentColor'}}></div>
              {info_resource.ateestado === 'C' && 'Trabajo Calificado'}
              {info_resource.ateestado === 'E' && 'Trabajo Entregado'}
              {info_resource.ateestado === 'P' && 'Entrega Pendiente'}
              {info_resource.ateestado === 'D' && 'Trabajo Devuelto'}
            </div>
          </div>
        )}

        <div className="descripcion-box box-blanca">
          {isTask && <h3>Descripción de la tarea</h3>}
          <div className="descripcion-texto">{info_resource.astdesctrabajo}</div>
        </div>

        {isTask && resourcesDocent && resourcesDocent.length > 0 && (
          <div className="adjuntos-box box-blanca">
            <h3>Adjuntos y Recursos</h3>
            <AttachmentsFiles resources={resourcesDocent} />
          </div>
        )}
      </div>

      <div className="contenido-sidebar">
        {(isEnouncement || isMaterial) && resourcesDocent && resourcesDocent.length > 0 && (
          <div className="adjuntos-box box-blanca">
            <h3 className="box-title">Archivos Adjuntos</h3>
            <AttachmentsFiles resources={resourcesDocent} />
          </div>
        )}

        {isTask && (
          <>
            <div className='entrega-seccion box-blanca'>
              <div className='entrega-info-titulo'>
                <div>
                  <h3>Tu Entrega</h3>
                  <p>Sube tu archivo antes de la fecha límite.</p>
                </div>
              </div>
              
              <div className='contenido-extra-entrega'>
                <div className='entrega-info-subir-archivo'>
                  <UploadFile />
                </div>
                <button 
                  className='btn-action-task'
                  style={{
                    backgroundColor: info_resource.ateestado === 'P' ? '#f59e0b': '#888888ff'
                  }}
                >
                  {info_resource.ateestado === 'P' ? 'Entregar Tarea' : 'Anular Entrega'}
                  <SendIcon />
                </button>

                <div className='entrega-calificacion'>
                  <span>Calificación</span>
                  <span>{info_resource.atccalificacion || '--'} / {info_resource.astpunt_max || 100}</span>
                </div>
              </div>
            </div>

            <div className="comentarios-box box-blanca">
              <h3 className="box-title">Comentarios del Profesor</h3>
              <div className="comentarios-content">
                <p className="no-comments">Aún no hay comentarios.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}