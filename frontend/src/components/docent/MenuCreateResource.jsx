import '../../styles/docent/MenuCreateResource.css'
import { ClipboardCheckIcon, BookIcon, SpeakerPhone, DevicesQuestionIcon } from "../common/GeneralIcons"
import { useNavigate, useLocation } from 'react-router-dom'

export function MenuCreateResource({ onClose }) {
    const navigate = useNavigate()
    const location = useLocation()

    // Función que permite navegar a la página de creación de recursos según el tipo de recurso.
    const handleClickNavigate = (type) => {
        const COMPLEMENT_URL = {
            TA: 'create-task',
            MA: 'create-material',
            EN: 'create-announcement',
            EX: 'create-exam'
        }
        navigate(`${location.pathname}/${COMPLEMENT_URL[type]}`)
    }

    return (
        <>
            <div 
                style={{position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 998}}
                onClick={onClose}
            ></div>
            <section className="menu-options-create-resource" style={{ zIndex: 999 }}>
                <button onClick={() => handleClickNavigate('TA')}>
                    <ClipboardCheckIcon />
                <div>
                    <h3 className='title-menu-option-resource'>Tarea</h3>
                    <span className='description-menu-option-resource'>
                        Asigna trabajo a los estudiantes.
                    </span>
                </div>
                </button>
                <button onClick={() => handleClickNavigate('MA')}>
                    <BookIcon />
                    <div>
                        <h3 className='title-menu-option-resource'>Material</h3>
                        <span className='description-menu-option-resource'>
                            Sube archivos y recursos.
                        </span>
                    </div>
                </button>
                <button onClick={() => handleClickNavigate('EN')}>
                    <SpeakerPhone />
                    <div>
                        <h3 className='title-menu-option-resource'>Enunciado</h3>
                        <span className='description-menu-option-resource'>
                            Publica un anuncio general.
                        </span>
                    </div>
                </button>
                <button onClick={() => handleClickNavigate('EX')}>
                    <DevicesQuestionIcon />
                    <div>
                        <h3 className='title-menu-option-resource'>Examen</h3>
                        <span className='description-menu-option-resource'>
                            Diseña evaluaciones.
                        </span>
                    </div>
                </button>
        </section>
        </>
    )
}
    