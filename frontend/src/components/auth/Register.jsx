import nutriaPrincipal from '../../assets/nutria_principal.png'
import '../../styles/auth/Register.css'
import { useNavigate } from 'react-router-dom'

export function Register(){
      const navigate = useNavigate()
    return (
        <div className='container-all-register'>
            <div className='container-principal-register'>
                  <div className='container-info-register'>
                    <div className='image-register'>
                    <img src={nutriaPrincipal} width='100px' height='150px' />
                    </div>
                    <div className='title-register'>
                        <h2>Unete a nuestra comunidad</h2>
                        <p>Empieza su viaje educativo en un entorno de calma y aprendizaje colaborativo</p>
                    </div>
                  </div>
            <form className='form-register'>
                <header>
                    <h2>Crea una cuenta</h2>
                    <p>Introduce tus datos personales</p>
                </header>
            <div className='fields-form-register'>
            <div className='fields-form'>
                <label>
                    Nombre completo
                    <input 
                    type="text" 
                    placeholder='Pepito perez'
                    name ='usunom' 
                    />
                </label>
                 <label>
                    Correo electronico
                    <input 
                    type="email" 
                    placeholder='usuario@dominio.com'
                    name ='usuemail' 
                    />
                  <label>
                   <label >
                    Tipo de documento
                    <select name="tidid">
                        <option value="">Seleccione su tipo de documento</option>
                    </select>
                   </label>
                   <label>
  Numero de documento
  <input type="text" name="usudocu" />
</label>
  <label>
                    Numero de celular
                    <input 
                    type="text" 
                    name ='usucel' 
                    />
                   </label>

                    Selecciona tu rol:
                    <button>
                  <div className='boton-register'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="#1a365d">
                         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M21.5 5.134a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 .866a8 8 0 0 0 -7.5 -.266v-15.174a10 10 0 0 1 8.5 .708m-10.5 -.707l.001 15.174a8 8 0 0 0 -7.234 .117l-.327 .18l-.103 .044l-.049 .016l-.11 .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 -.061l-.004 -.049l-.002 -13.068a1 1 0 0 1 .5 -.866a10 10 0 0 1 8.5 -.707"/>
                          </svg>
                         <span>Estudiante</span>
                         </div>
                        </button>
                          <button>
                  <div className='boton-register'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a365d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chalkboard-teacher"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1" /><path d="M12 14a2 2 0 1 0 4.001 -.001a2 2 0 0 0 -4.001 .001" /><path d="M17 19a2 2 0 0 0 -2 -2h-2a2 2 0 0 0 -2 2" /></svg>
                         <span>Docente</span>
                         </div>
                        </button>


                   </label>
                </label>
                   <label>
                    Contraseña
                    <input 
                    type="password" 
                    placeholder='Minimo 8 letras, una mayuscula y un caracter especial'
                    name ='usupwd' 
                    />
                   </label>
                  <label>
  Confirmar Contraseña
  <input type="password" name="usupwd_confirm" />
</label>

            
                 
                
                
            </div>
            <footer>
                <div className='final-part form'>
                    <button className='btn-register-form'>
                        Registrarse
                    </button>
                    <button 
                        type='button'
                        className='btn-login-account'
                        onClick={() => navigate('/')}
                    >
                        ¿ya tienes una cuenta? <span>Inicia sesion aqui</span>
                    </button>
                </div>
            </footer>
            </div>
            </form>
            </div>
        </div>
    )
}
