import { useState } from 'react'
import './styles/login.css'

function App() {

  return (
    <>
      <form className='container-form-login'>
        <header className='header-login'>
          <h1>Inicio de Sesión</h1>
        </header>
        <section className='fields-login'>
          <label htmlFor="email">Correo</label>
          <input type="email" id="Email" placeholder='usuario@donimio.com'/>

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="Password" />
        </section>

        <section className='forgot-password'>
          <a>¿Olvidaste tu Contraseña?</a>
        </section>

        <button>Ingresar</button>
      <a>¿No tienes una cuenta? Registrate aqui</a>
      </form>
    </>
  )
}

export default App
