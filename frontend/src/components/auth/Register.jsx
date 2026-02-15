import nutriaPrincipal from '../../assets/nutria_principal.png'
import '../../styles/auth/Register.css'
import { useNavigate } from 'react-router-dom'

export function Register(){
      const navigate = useNavigate()
    return (
        <div className='container-all-register'>
            <div className='container-principal-register'>
                  <div className='container-info-registe'>
                    <div className='image-register'>
                    <img src={nutriaPrincipal} width='100px' height='150px' />
                    </div>
                    <div className='title-register'>
                        <h2></h2>
                        <p></p>
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
                   <label>
                    Rol:
                   <select name="usurol">
                    <option value="">Seleccciona un rol</option>
                   </select>
                   </label>
                   <label >
                    Tipo de documento
                    <select name="tidid">
                        <option value="">Seleccione su tipo de documento</option>
                    </select>
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
