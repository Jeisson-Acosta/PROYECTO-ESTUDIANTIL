import nutriaPrincipal from '../../assets/nutria_principal.png'
import '../../styles/auth/Login.css'

export function Login() {
    return (
        <section className="container-pricipal-login">
            <div className="container-info-login">
                <div className="image-login">
                    <img src={nutriaPrincipal} width='100px' height='150px' />
                </div>
                <div className='title-login'>
                    <h2>¡Bienvenido!</h2>
                    <p>Tu espacio de aprendizaje diseñado para la excelencia y la tranquilidad.</p>
                </div>
            </div>
            <form className='form-login'>
                <header>
                    <h2>Iniciar sesión</h2>
                    <p>Introduce tus credenciales para acceder</p>
                </header>
                <div className='fields-form-login'>
                    <div className='fields-form'>
                        <label>
                            CORREO ELECTRÓNICO
                            <input type="email" placeholder='usuario@dominio.com' />
                        </label>

                        <label>
                            Contraseña
                            <input type="password" placeholder='Ingresa tu contraseña' />
                        </label>
                    </div>
                    <footer>
                        <div className='remind-me-forgot-password-form'>
                            <div>
                                <input type="radio" name="remind-me" id='remind-me' />
                                <label htmlFor="remind-me">Recordarme</label>
                            </div>
                            <button className='forgot-password'>
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <div className='final-part-form'>
                            <button className='btn-login-form'>
                                Ingresar
                            </button>
                            <button className='btn-create-account'>
                                ¿Aún no eres parte? <span>Crear una cuenta</span>
                            </button>
                        </div>
                    </footer>
                </div>
            </form>
        </section>   
    )
}