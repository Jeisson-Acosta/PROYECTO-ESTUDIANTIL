import nutriaPrincipal from '../../assets/nutria_principal.png'
import { ArrowLeftIcon } from './GeneralIcons'
import '../../styles/common/Unauthorized.css'
import { useNavigate } from 'react-router-dom'

export function Unauthorized() {
    const navigate = useNavigate()
    
    return (
        <div className="container-all-unauthorized">
            <div className="card-unauthorized">
                <div className="header-unauthorized">
                    <h3>CEFCOC</h3>
                </div>
                
                <div className="image-unauthorized">
                    <img src={nutriaPrincipal} alt="Nutria Moti" />
                </div>
                
                <div className="content-unauthorized">
                    <h2>¡Ups! Moti no tiene permiso para dejarte pasar aquí</h2>
                    <p>
                        Parece que has intentado acceder a una zona restringida de <strong>CEFCOC</strong>. Verifica la URL o inicia sesión con las credenciales adecuadas para explorar esta sección.
                    </p>
                </div>
                
                <button className="btn-back-login-unauthorized" onClick={() => navigate('/login')}>
                    <ArrowLeftIcon />
                    Volver al Inicio de Sesión
                </button>
            </div>
        </div>
    )
}