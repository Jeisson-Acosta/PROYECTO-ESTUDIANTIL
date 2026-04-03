import '../../styles/common/ConfigurationAccount.css'
import { UserIcon } from "./GeneralIcons"
import { useState } from "react"
import { ButtonCommon } from "./ButtonCommon.jsx"

export function ConfigurationAccount() {
    const [selectedOption, setSelectedOption] = useState('perfil')
    return (
        <section className="container-configuration-account">
            <header className="header-configuration-account">
                <h1>Configuracion de Cuenta</h1>
                <p>Gestiona tu perfil, preferencias y seguridad.</p>
            </header>

            <section className="container-main-configuration">
                <nav className="options-configuration">
                    <ul>
                        <li 
                            className={`option ${selectedOption === 'perfil' ? 'selected' : ''}`}
                            onClick={() => setSelectedOption('perfil')}
                        >
                            <UserIcon/>
                            <span>Mi Perfil</span>
                        </li>
                    </ul>
                </nav>
            </section>

            <section className="container-content-selected-option">
                {selectedOption === 'perfil' && (
                    <>
                        <header className="header-my-perfil">
                            <div className="title-header">
                                <h3>Información Personal</h3>
                                <p>Actualiza tu foto y detalles personales.</p>
                            </div>
                            <ButtonCommon text="Guardar Cambios"/>
                        </header>

                        <div className="container-info-perfil">
                            <div className="container-photo-perfil">
                                <img 
                                    src="https://tse1.explicit.bing.net/th/id/OIP.DnQq__W5pibltm9H65jDLQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" 
                                    alt="imagen de perfil" 
                                />
                                <div className="container-actions-photo">
                                    <h4>Foto de perfil</h4>
                                    <p>Sube una imagen de al menos 300x300 px.</p>
                                    <div className="buttons-actions-photo">
                                        <button>
                                            Subir
                                        </button>
                                        <button style={{color: '#f14444'}}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="container-form-info-perfil">
                            <div className="container-input-form">
                                <label htmlFor="usunom">Nombre completo</label>
                                <input type="text" id="usunom" />
                            </div>
                            <div className="container-input-form">
                                <label htmlFor="usuemail">Correo electronico</label>
                                <input type="email" id="usuemail" />
                            </div>
                            <div className="container-input-form">
                                <label htmlFor="usudocu">Número de Identificación</label>
                                <input type="text" id="usudocu" />
                            </div>
                            <div className="container-input-form">
                                <label htmlFor="edcnom">Curso</label>
                                <input type="text" id="edcnom" />
                            </div>
                        </section>
                    </>
                )}
            </section>
        </section>
    )
}