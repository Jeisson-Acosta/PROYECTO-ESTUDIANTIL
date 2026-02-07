import NutriaPrincipal from '../assets/nutria_principal.png'
import '../styles/auth/Login.css'
export function Login() {
    return(
       <section className="container-principal-Login">
           <div className="container-info-Login">
            <div className="image-Login">
                  <img src ={NutriaPrincipal} width='100px'/>
            </div>
          
           
           <div className='title-login'>
               <h3>¡Bienvenido!</h3>
               <p>tu espacio de aprendizaje diseñado para al excelencia y la tranquilidad</p>
           </div>
           </div>
           <form className='form-login'>
            <header>
              <h2>iniciar sesion</h2>
              <p>introduce tus credenciales para acceder</p>
               </header>
              <div className='fields-form-login'>
                <div className='fields-form'>
                <label>
                    CORREO ELECTRONICO
                    <input type="email" placeholder='usuario@dominio.com' />
                </label>
                <label>
                    <input type="password" placeholder='ingresa tu contraseña' />
                </label>
                </div>
                <footer>
                    <div className='remind-me-forgot-password-form'>
                        <div>
                            <input type="radio" name="remind-me" id="remind-me" />
                            <label htmlFor="remind-me">Recordarme</label>
                        </div>
                        <button className='forgot-password'>
                            ¿Olvidaste tu Contraseña
                        </button>
                    </div>
                    <div className='final-part-form'>
                        <button className='btn-login-form'>
                                ingresar
                        </button>
                            <button className='btn-create-account'>
                            ¿Aun no eres parte? <span>crear una cuenta</span>
                        </button>
                    </div>
                </footer>
              </div>
           
           </form>
       </section>
    )
}