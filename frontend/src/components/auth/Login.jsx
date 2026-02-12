import toast from 'react-hot-toast'
import nutriaPrincipal from '../../assets/nutria_principal.png'
import '../../styles/auth/Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Login() {

  const [userInfoLogin, setUserInfoLogin] = useState({
    usuemail: '',
    usupwd: ''
  })

  const navigate = useNavigate()

  const handleChangeUserInfoLogin = (event) => {
    setUserInfoLogin({
      ...userInfoLogin,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmitFormLogin = (event) => {
    event.preventDefault()

    if (userInfoLogin.usuemail === '') 
      return toast.error('El correo electrónico no puede estar vacío')

    if (userInfoLogin.usupwd === '') 
      return toast.error('La contraseña no puede estar vacía')

    if (
      userInfoLogin.usuemail === 'pepito@gmail.com' &&
      userInfoLogin.usupwd === '1234'
    ) {
      toast.success('¡Bienvenido Pepito!')
      navigate('/dashboard')
    } else {
      toast.error('Algo salió mal. ¡Inténtalo de nuevo!')
    }
  }

  return (
    <div className='container-all-login'>        
      <section className="container-pricipal-login">
        <div className="container-info-login">
          <div className="image-login">
            <img src={nutriaPrincipal} width="100" height="150" />
          </div>
          <div className='title-login'>
            <h2>¡Bienvenido!</h2>
            <p>Tu espacio de aprendizaje diseñado para la excelencia y la tranquilidad.</p>
          </div>
        </div>

        <form className='form-login' onSubmit={handleSubmitFormLogin}>
          <header>
            <h2>Iniciar sesión</h2>
            <p>Introduce tus credenciales para acceder</p>
          </header>

          <label>
            Correo electrónico
            <input
              type="email"
              name="usuemail"
              value={userInfoLogin.usuemail}
              onChange={handleChangeUserInfoLogin}
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="usupwd"
              value={userInfoLogin.usupwd}
              onChange={handleChangeUserInfoLogin}
            />
          </label>

          <button className='btn-login-form'>
            Ingresar
          </button>

          <button type="button" className='btn-create-account'>
            ¿Aún no eres parte? <span>Crear una cuenta</span>
          </button>
        </form>
      </section>  
    </div>
  )
}
