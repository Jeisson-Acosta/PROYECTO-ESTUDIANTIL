import nutriaPrincipal from '../../assets/nutria_principal.png'
import { ArrowLeftIcon, SendFilledIcon } from '../../components/common/GeneralIcons.jsx'
import '../../styles/auth/ForgotPassword.css'

import { useNavigate } from 'react-router-dom'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    const { requestDB } = useRequestDB()
    const navigate = useNavigate()

    const handleSubmitSendEmail = async (e) => {
        e.preventDefault()
        if (email === '') return toast.error('Por favor, ingresa tu correo electrónico')
        
        const responseDB = await requestDB('auth/forgot-password', 'POST', { usuemail: email })
        if (!responseDB.ok) return toast.error(responseDB.message)

        setEmail('')
        toast.success(responseDB.message)
    }

    return (
        <div className="container-all-forgot-password">
            <section className="principal-container-forgot-password">
                <div className="description-form-forgot-password">
                <div className="container-icon-nutria">
                    <img src={nutriaPrincipal} alt="Nutria Principal" />
                </div>
                <div className="title-description">
                    <h2 className='title'>Tu aprendizaje continúa</h2>
                    <p className='description'>
                        No dejes que una contraseña olvidad te detenga. Estamos aqui para ayudarte a volver al camino del conocimiento.
                    </p>
                </div>
            </div>
            <div className="container-form-forgot-password">
                <header className="header-form-forgot-password">
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <p>
                        Ingresa tu correo electrónico y te enviaremos un enlace para que puedas recuperar el acceso a tu cuenta.
                    </p>
                </header>
                <form className="form-forgot-password" onSubmit={handleSubmitSendEmail}>
                    <label htmlFor="usuemail-forgot-password">Correo electrónico</label>
                    <input 
                        type="email" 
                        placeholder="ejemplo@dominio.com" 
                        id='usuemail-forgot-password' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className='btn-send-url'>
                        Enviar Enlace
                        <SendFilledIcon />
                    </button>
                    <button className='btn-back-login' onClick={() => navigate('/login')}>
                        <ArrowLeftIcon />
                        Volver al inicio de sesión
                    </button>
                </form>
            </div>
        </section>
        </div>
    )
}