import '../../styles/rector/FormCreateStudent.css'
import { LockIcon, UserCheckIcon, UserIcon } from "../common/GeneralIcons.jsx"
import { IconHatStudent } from "../common/IconsLayout"

export function FormCreateStudent() {
    return (
        <section className="principal-container-create-student">
            <header className="header-create-student">
                <p>
                    Ingresa la informacion completa para matricular un nuevo alumno en el sistema.<br />
                    Asegurate de llenar todos los campos obligatorios.
                </p>
            </header>
            <form className="form-create-student">
                <section className="personal-info-student">
                    <header className="header-section-form">
                        <div className="icon-container">
                            <UserIcon />
                        </div>
                        <div className="title-container">
                            <h3>
                                Informacion Personal
                            </h3>
                        </div>
                    </header>
                    <div className="container-form-inputs">
                        <div className="input-group">
                            <label htmlFor="usunom">Nombre Completo</label>
                            <input type="text" id="usunom" name="usunom" placeholder="Ej: Juan Camilo Rodriguez" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usudocu">Numero de Documento</label>
                            <input type="text" id="usudocu" name="usudocu" placeholder="Ej: 123456789" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usufch_nacimiento">Fecha de nacimiento</label>
                            <input type="date" id="usufch_nacimiento" name="usufch_nacimiento" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usucorreo">Correo Electronico</label>
                            <input type="email" id="usucorreo" name="usucorreo" placeholder="juan.perez@ejemplo.com" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usucel">Telefono</label>
                            <input type="text" id="usucel" name="usucel" placeholder="Ej: 3123456789" />
                        </div>
                    </div>
                </section>
                <section className="academic-info-student">
                    <header className="header-section-form">
                        <div className="icon-container">
                            <IconHatStudent />
                        </div>
                        <div className="title-container">
                            <h3>
                                Informacion Academica
                            </h3>
                        </div>
                    </header>
                    <div className="container-form-inputs">
                        <div className="input-group">
                            <label htmlFor="edccod">Curso</label>
                            <select id="edccod" name="edccod">
                                <option value="">Seleccione un curso</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section className="account-security-student">
                    <header className="header-section-form">
                        <div className="icon-container">
                            <LockIcon />
                        </div>
                        <div className="title-container">
                            <h3>
                                Seguridad de la Cuenta
                            </h3>
                        </div>
                    </header>
                    <div className="container-form-inputs">
                        <div className="input-group">
                            <label htmlFor="usupwd">Contraseña</label>
                            <input type="password" id="usupwd" name="usupwd" placeholder="*********" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usupwd_confirm">Confirmar Contraseña</label>
                            <input type="password" id="usupwd_confirm" name="usupwd_confirm" placeholder="*********" />
                        </div>
                    </div>
                </section>
                <footer className="footer-form-create-student">
                    <div className="buttons-actions">
                        <button className="btn-cancel-form">
                            Cancelar
                        </button>
                        <button className="btn-submit-form">
                            <UserCheckIcon />
                            Regitrar estudiante
                        </button>
                    </div>
                </footer>
            </form>
        </section>
    )
}