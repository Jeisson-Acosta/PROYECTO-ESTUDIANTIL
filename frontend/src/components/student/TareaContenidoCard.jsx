import { useContext, useEffect, useState } from 'react'
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'
import { useUploadFile } from '../../hooks/common/useUploadFile.js'
import { useNavigate } from 'react-router-dom'

import "../../styles/common/TareaContenido.css"
import { IconScore, IconSubject } from '../common/IconsContenidoClase'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { UploadFile } from '../common/UploadFile.jsx'
import {  SendIcon } from '../common/GeneralIcons.jsx'
import { AttachmentsFiles } from '../common/classes/AttachmentsFiles.jsx'

import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useCurrentClass } from '../../hooks/docent/useCurrentClass.js'

import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

export function ContenidoCard({ info_resource }) {

  const [entregaAnulada, setEntregaAnulada] = useState(false)
  const { userLogin } = useContext(UserLoginContext) || {}
  const { setTitleHeaderOption } = useTitleHeaderOption()
  const { currentClass } = useCurrentClass()

  const navigate = useNavigate()

  const uploadProps = useUploadFile()
  const { uploadedFiles, setUploadedFiles, inputFileRef } = uploadProps
  const { requestDB } = useRequestDB()

  const resourcesDocent = info_resource.resources?.filter(resource => resource.created_by === 'DOC')
  const resourcesStudent = info_resource.resources?.filter(resource => resource.created_by === 'EST')

  const isTask = info_resource.asttip === 'TA'
  const isEnouncement = info_resource.asttip === 'EN'
  const isMaterial = info_resource.asttip === 'MA'

  const handleClickActionTask = async (ateestado) => {
    if (ateestado === 'P') {
      const formData = new FormData()

      formData.append('usuid', userLogin.userInfo.usuid)
      formData.append('cedid', userLogin.educativeCenterInfo[0].cedid)
      formData.append('cecid', userLogin.currentCycleInfo.cecid)
      formData.append('astid', info_resource.astid)
      formData.append('ateestado', 'E')
      formData.append('cednom', userLogin.educativeCenterInfo[0].cednom)
      
      uploadedFiles.forEach(file => { formData.append('files', file) })

      const responseDB = await requestDB('student/submit-task', 'POST', formData)
      if (!responseDB.ok) return toast.error(responseDB.message)

      toast.success('Tarea entregada exitosamente')
      confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
      })

      setUploadedFiles([])
      inputFileRef.current.value = ''

      navigate(-1)
    }

    if (ateestado === 'E') {
      console.log('Anular')
    }
  }

  console.log(info_resource)

  useEffect(() => {
    setTitleHeaderOption(info_resource.astnomtrabajo)
  }, [])

  return (
    <div className="contenido-card" style={{padding: '20px'}}>
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

        {/*<h1 className="titulo-trabajo">{info_resource.astnomtrabajo}</h1>*/}

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
                  {resourcesStudent !== null && resourcesStudent.length > 0 
                  ? <AttachmentsFiles resources={resourcesStudent} /> 
                  : <UploadFile {...uploadProps} />
                  }
                </div>
                <button 
                  className='btn-action-task'
                  style={{
                    backgroundColor: info_resource.ateestado === 'P' ? '#f59e0b': '#888888ff'
                  }}
                  onClick={() => handleClickActionTask(info_resource.ateestado)}
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