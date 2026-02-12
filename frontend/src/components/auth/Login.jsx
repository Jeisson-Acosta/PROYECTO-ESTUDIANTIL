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
            return toast.error('El correo electronico no puede estar vacío')

        if (userInfoLogin.usupwd === '') 
            return toast.error('La contraseña no puede estar vacía')

        if (
            userInfoLogin.usuemail === 'pepito@gmail.com' &&
            userInfoLogin.usupwd === '1234'
        ) {
            toast.success('¡Bienvenido Pepito!')
            navigate('/dashboard')
        } else {
            toast.error('Algo salio mal. ¡Intentalo de nuevo!')
        }
    }

    return (
        <div className='container-all-login'>        
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

                <form 
                    className='form-login' 
                    onSubmit={(e) => handleSubmitFormLogin(e)}
                >
                    <header>
                        <h2>Iniciar sesión</h2>
                        <p>Introduce tus credenciales para acceder</p>
                    </header>

                    <div className='fields-form-login'>
                        <div className='fields-form'>
                            <label>
                                Correo electrónico
                                <input 
                                    type="email" 
                                    placeholder='usuario@dominio.com' 
                                    name='usuemail' 
                                    value={userInfoLogin.usuemail}
                                    onChange={(e) => handleChangeUserInfoLogin(e)}
                                />
                            </label>

                            <label>
                                Contraseña
                                <input 
                                    type="password" 
                                    placeholder='Ingresa tu contraseña' 
                                    name='usupwd'
                                    value={userInfoLogin.usupwd}
                                    onChange={(e) => handleChangeUserInfoLogin(e)}
                                />
                            </label>
                        </div>

                        <footer>
                            <div className='remind-me-forgot-password-form'>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="remind-me" 
                                        id='remind-me' 
                                    />
                                    <label htmlFor="remind-me">
                                        Recordarme
                                    </label>
                                </div>

                                <button 
                                    type="button" 
                                    className='forgot-password'
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            <div className='final-part-form'>
                                <button className='btn-login-form'>
                                    Ingresar
                                </button>

                                <button 
                                    type="button" 
                                    className='btn-create-account'
                                >
                                    ¿Aún no eres parte? <span>Crear una cuenta</span>
                                </button>
                            </div>
                        </footer>
                    </div>
                </form>
            </section>  
        </div>
    )
}
