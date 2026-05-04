import { useState } from 'react'
import nutriaPrincipal from '../../assets/nutria_principal.png'
import { ArrowLeftIcon, CheckIcon } from '../../components/common/GeneralIcons'
import '../../styles/auth/ResetPassword.css'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

export function ResetPassword() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [searchParams] = useSearchParams()
    const { requestDB } = useRequestDB()

    const token = searchParams.get('token')
    
    // Esta funcion me ayuda a calcular la seguridad de la contraseña
    const calculateStrength = (pass) => {
        if (!pass) return { width: '0%', text: '', color: '#e0e0e0' }
        let score = 0
        if (pass.length >= 8) score += 1
        if (pass.length >= 12) score += 1
        if (/[A-Z]/.test(pass)) score += 1
        if (/[0-9]/.test(pass)) score += 1
        if (/[^A-Za-z0-9]/.test(pass)) score += 1

        if (score <= 2) return { width: '33%', text: 'Débil', color: '#ff4d4f' }
        if (score <= 4) return { width: '66%', text: 'Media', color: '#faad14' }
        return { width: '100%', text: 'Fuerte', color: '#6eb8d1' }
    }

    const strength = calculateStrength(password)

    const handleClickUpdatePassword = async () => {

        if (!password || !confirmPassword) {
            toast.error("Todos los campos son requeridos")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden")
            return
        }

        const responseDB = await requestDB('auth/reset-password', 'POST', { usupwdtoken: token, usupwd: password })
        if (!responseDB.ok) {
            toast.error(responseDB.message)
            return
        }

        toast.success(responseDB.message)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })
        navigate('/login')
    }

    if (!token) {
        navigate('/unauthorized')
        return null
    }

    return (
        <div className="container-all-reset-password">
            <section className="principal-container-reset-password">
                <div className="description-form-reset-password">
                    <div className="container-icon-nutria">
                        <img src={nutriaPrincipal} alt="Nutria Principal" />
                    </div>
                    <div className="title-description">
                        <h2 className='title'>¡Casi listo!</h2>
                        <p className='description'>
                            Estamos aquí para ayudarte a recuperar el acceso a tus herramientas de aprendizaje. Elige algo seguro pero fácil de recordar.
                        </p>
                    </div>
                </div>
                <div className="container-form-reset-password">
                    <header className="header-form-reset-password">
                        <h2>Restablecer contraseña</h2>
                        <p>
                            Elige una contraseña segura para proteger tu cuenta.
                        </p>
                    </header>
                    <form className="form-reset-password">
                        <div className="field-group">
                            <label htmlFor="new-password">Nueva contraseña</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                id='new-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        
                        <div className="password-strength-container">
                            <div className="strength-header">
                                <span className="strength-label">SEGURIDAD</span>
                                <span className="strength-text" style={{ color: strength.color }}>{strength.text}</span>
                            </div>
                            <div className="strength-bar-bg">
                                <div className="strength-bar-fill" style={{ width: strength.width, backgroundColor: strength.color }}></div>
                            </div>
                            <span className="strength-hint">
                                <CheckIcon /> Usa al menos 8 caracteres, números y símbolos.
                            </span>
                        </div>
                        

                        <div className="field-group">
                            <label htmlFor="confirm-password">Confirmar nueva contraseña</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                id='confirm-password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button type="button" className='btn-update-password' onClick={handleClickUpdatePassword}>
                            Actualizar contraseña
                            <span style={{ marginLeft: '4px', fontSize: '18px' }}>→</span>
                        </button>
                        <button type="button" className='btn-back-login' onClick={() => navigate('/login')}>
                            <ArrowLeftIcon />
                            Volver al inicio de sesión
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}