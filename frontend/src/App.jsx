import './styles/Login.css'
function App() {

  return (
    <>
      <form className='container-form-login'>
        <header className='header-login'>
          <h1>Inicio de sesión</h1>
        </header>

        <section className='fields-login'>
          <label htmlFor="email">Correo</label>
          <input type="email" id='email' placeholder='usuario@dominio.com'/>

          <label htmlFor="password">Contraseña</label>
          <input type="password" id='password' />
        </section>

        <section className='forgot-password'>
          <a>¿Olvidaste tu contraseña?</a>
        </section>

        <button>Ingresar</button>
        <a>¿No tienes una cuenta? Registrate aquí</a>
      </form>
    </>
  )
}

export default App
