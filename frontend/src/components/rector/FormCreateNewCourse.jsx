import { useEffect } from "react"
import { useTitleHeaderOption } from "../../hooks/common/useTitleHeaderOption.js"
import * as Backgrounds from '../common/BackgroundsClasses.jsx'
import * as Icons from '../common/IconsClasses.jsx'

const COLORS_TO_SELECT = ['6C63FF', '10B981', 'FF6B6B', 'F59E0B', '38BDF8', 'F43F5E', '14B8A6', '8B5CF6', 'FB923C', '84CC16']

export function FormCreateNewCourse() {
    const { setTitleHeaderOption } = useTitleHeaderOption()

    useEffect(() => {
        setTitleHeaderOption('Registrar nuevo curso')
    }, [])

    console.log(Object.keys(Backgrounds))
    
    return (
        <form className="form-create-new-course">
            <section className="section-form">
                <header className="header-section-form">
                    <div className="icon"></div>
                    <div className="title">
                        <h3>Informacion General</h3>
                    </div>
                </header>
                <div className="container-form-inputs">
                    <div className="input-group">
                        <label htmlFor="asgnom">Nombre del curso</label>
                        <input type="text" id="asgnom" placeholder="EJ: Matematicas Avanzadas" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="asgcod_clase">Codigo del Curso</label>
                        <input type="text" id="asgcod_clase" placeholder="EJ: MAT-101" />
                    </div>
                </div>
            </section>
            <section className="section-form">
                <header className="header-section-form">
                    <div className="icon"></div>
                    <div className="title">
                        <h3>Apariencia Visual</h3>
                    </div>
                </header>
                <div className="container-visuals">
                    <div className="container-background">
                        <h5>
                            Fondo de clase
                        </h5>
                        <div className="container-backgrounds-list">
                            {Object.keys(Backgrounds).map(background => {
                                const CurrentBackground = Backgrounds[background]
                                return (
                                    <CurrentBackground 
                                        key={background}
                                        
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="container-avatars">
                        <h5>
                            Avatar de clase
                        </h5>
                        <div className="container-avatars-list">
                            {Object.keys(Icons).map(icon => {
                                const CurrentIcon = Icons[icon]
                                return (
                                    <CurrentIcon
                                        key={icon}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="containers-colors">
                        <h5>
                            Colores de clase
                        </h5>
                        <div className="container-colors-list">
                            {COLORS_TO_SELECT.map(color => (
                                <div
                                    key={color}
                                    className="color-option"
                                    style={{ 
                                        backgroundColor: `#${color}`,
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                    }}
                                    onClick={() => {
                                        console.log(color)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section> 
            <section className="section-form">
                <header className="header-section-form">
                    <div className="icon"></div>
                    <div className="title">
                        <h3>Asignacion y Logistica</h3>
                    </div>
                </header>
                <div className="container-form-inputs">
                    <div className="input-group">
                        <label htmlFor="asgnom">Docente Asignado</label>
                        <select name="docente" id="docente">
                            <option value="">Seleccione un docente</option>
                            <option value="">Select 2</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="asgmaxest">Capacidad de Estudiantes</label>
                        <input type="text" id="asgmaxest" placeholder="EJ: 100" />
                    </div>
                </div>
            </section>
            <section className="section-form">
                <header className="header-section-form">
                    <div className="icon"></div>
                    <div className="title">
                        <h3>Cronograma y Estado</h3>
                    </div>
                </header>
                <div className="container-form-inputs">
                    <div className="buttons-status">
                        <button>
                            Activo
                        </button>
                        <button>
                            Inactivo
                        </button>
                    </div>
                </div>
            </section>
        </form>
    )
}