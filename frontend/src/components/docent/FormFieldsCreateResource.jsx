// ==================== STYLES ====================
import "../../styles/docent/FormFieldsCreateResource.css"
// ================================================

// ==================== COMPONENTS ====================
import { FileUploadIcon, SendIcon } from "../common/GeneralIcons.jsx"
// ====================================================

export function FormFieldsCreateResource({ typeResource }) {
    return (
        <section className="fields-form-create-resource">
            <section style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                <div className="field">
                    <label htmlFor="title-resource">
                        TÍTULO {typeResource === 'TA' 
                        ? 'DE LA TAREA'
                        : typeResource === 'MA'
                            ? 'DEL MATERIAL'
                            : 'DEL ANUNCIO'
                    }
                    </label>
                    <input 
                        type="text" 
                        id="title-resource" 
                        name=""
                        placeholder="EJ: Investigación sobre..."
                    />
                </div>
                {typeResource === 'MA' && (
                    <div className="field">
                        <label htmlFor="category">
                            CATEGORÍA
                        </label>
                        <select name="" id="category">
                            <option value="">Seleccionar</option>
                        </select>
                    </div>
                )}
            </section>
            <div className="field">
                <label htmlFor="instructions-resource">
                    {typeResource === 'TA'
                        ? "INSTRUCCIONES"
                        : typeResource === 'MA'
                            ? "DESCRIPCIÓN DEL RECURSO"
                            : "MENSAJE"
                    }
                </label>
                <textarea 
                    name="" 
                    id="instructions-resource"
                    placeholder={typeResource === 'TA'
                        ? "Describe los requisitos de la tarea..."
                        : typeResource === 'MA'
                            ? "Añade instrucciones o una breve descripción para tus estudiantes..."
                            : "Escribe tu mensaje aqui..."
                    }
                ></textarea>
            </div>
            {typeResource === 'TA' && (
                <div className="fields-dates">
                    <div className="field">
                        <label htmlFor="limit-date">
                            FECHA LIMITE
                        </label>
                        <input type="date" name="" id="limit-date" />
                    </div>
                    <div className="field">
                        <label htmlFor="hour-limit">
                            HORA
                        </label>
                        <input type="time" name="" id="hour-limit" />
                    </div>
                    <div className="field">
                        <label htmlFor="points">
                            PUNTAJE
                        </label>
                        <input type="number" name="" id="points" />
                    </div>
                </div>
            )}
            <div className="field">
                <label htmlFor="attachments">
                    RECURSOS ADJUNTOS
                </label>
                <input 
                    type="file" 
                    name="" 
                    id="attachments" 
                    style={{display: 'none'}}
                />
                <section className="container-to-upload-file">
                    <div className="container-icon-upload">
                        <FileUploadIcon />
                    </div>
                    <div className="container-text-upload">
                        <h2>Subir archivos complementarios</h2>
                        <p>Arrastra y suelta archivos aquí o haz clic para seleccionarlos.</p>
                    </div>
                </section>
            </div>
            {typeResource === 'TA' && (
                <section className="container-switches-options">
                    <div className="switch">
                        <div>
                            <h3>Publicar inmediatamente</h3>
                            <p>Visible para todos los estudiantes</p>
                        </div>
                        <label className="container-switch">
                            <input type="checkbox" name="" id="" />
                            <span className="slider-switch"></span>
                        </label>
                    </div>
                    <div className="switch">
                        <div>
                            <h3>Entregas tardías</h3>
                            <p>Permitir envios después del plazo</p>
                        </div>
                        <label className="container-switch">
                            <input type="checkbox" name="" id="" />
                            <span className="slider-switch"></span>
                        </label>
                    </div>
                </section>
            )}
            <section className="container-buttons-actions">
                <button className="btn-discart">
                    Descartar
                </button>
                <button className="btn-create">
                    Crear {typeResource === 'TA' ? 'Tarea' : typeResource === 'MA' ? 'Material' : 'Anuncio'}
                    <SendIcon />
                </button>
            </section>
        </section>
    )
}