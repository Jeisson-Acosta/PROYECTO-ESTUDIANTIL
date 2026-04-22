import '../../styles/common/MenuApp.css'
import { IconHatStudent, IconDashboard, IconNotebook, IconClipboard, IconBars, IconSchedule,IconMedal,IconConfig,IconSesion} from "./IconsLayout.jsx"
import { NavLink } from "react-router-dom"
import { useContext } from 'react'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { useNavigate } from 'react-router-dom'
import { UserIcon } from './GeneralIcons.jsx'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import toast from "react-hot-toast"

function CardPlanUser(){
    return(
        <section className="container-plan-user">
                <header>
                    <div className="icon-plan">
                        <IconMedal/>
                    </div>

                    <div className="info-plan-user show-content-block">
                        <h5>Plan Pro</h5>
                        <p>Educacion avanzada</p>
                    </div>
                </header>

                <button className='show-content-flex'>
                    Ver planes
                </button>

                {/* <ButtonCommon text="Ver planes"/> */}

        </section>
    )
}
export function MenuApp() {
    const { userLogin, setUserLogin } = useContext(UserLoginContext)
    const {requestDB}= useRequestDB()
    const navigate = useNavigate()
    if (!userLogin.userInfo) return null

    const COMPLEMENTED_URL = userLogin.userInfo.rolcod === 'EST' ? 'student' : userLogin.userInfo.rolcod === 'DOC' ? 'docent' : 'rector'
    const handleClickLogoutUser = async ()=>{
        const response = await requestDB("auth/logout", "POST", {})
        if (!response.ok) return toast.error(response.message)
        setUserLogin({ userInfo: null, educativeCenterInfo: null, currentCycleInfo: null })
        navigate("/login")
        toast.success("¡Sesión cerrada exitosamente!")
    }

    return (
        <section className="principal-container-menu">
            <header className="header-menu">
                <div className="header-icon">
                    <IconHatStudent />
                </div>
                <h2 className="header-title-app text-module">
                    CEFCOC
                </h2>
            </header>
            <nav className="modules-menu">
                <ul>
                    <NavLink to={`/${COMPLEMENTED_URL}/dashboard`}>
                        <li>
                            <IconDashboard />
                            <span className="text-module">Dashboard</span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${COMPLEMENTED_URL}/cursos`}>
                        <li>
                            <IconNotebook />
                            <span className="text-module">Cursos</span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${COMPLEMENTED_URL}/tareas`}>
                        <li style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <IconClipboard />
                                <span className="text-module">Tareas</span>
                            </div>
                            <span
                                className="counter-quantity-tasks"
                                style={{display: 'none'}}
                            >
                                5
                            </span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${COMPLEMENTED_URL}/notas`}>
                        <li>
                            <IconBars />
                            <span className="text-module">Notas</span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${COMPLEMENTED_URL}/calendario`}>
                        <li>
                            <IconSchedule />
                            <span className="text-module">Calendario</span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${COMPLEMENTED_URL}/contenido`}>
                        <li>
                            <IconSchedule />
                            <span className="text-module">Contenido</span>
                        </li>
                    </NavLink>
                    <NavLink to={`/${COMPLEMENTED_URL}/calendario`}>
                        <li>
                            <IconSchedule />
                            <span className="text-module">Calendario</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>
        <CardPlanUser/>
        <footer className="footer-menu-app">
            <section className='container-user-profile'>
                <div className='photo-user'>
                    {userLogin.userInfo.usufoto_perfil ? (
                        <img src={userLogin.userInfo.usufoto_perfil} alt="Foto de perfil" />
                    ) : (
                        <UserIcon/>
                    )}
                </div>

                <div className='info-user show-content-block'>
                    <h4>{userLogin.userInfo.usunom}</h4>
                    <p>{userLogin.userInfo.rolnom}</p>
                </div>
            </section>
            <button onClick={() => navigate('/configuracion')}>
                <IconConfig/>
                <span className='show-content-block'>Configuracion</span>
            </button>
           {/* <ButtonCommon text="Configuracion" icon={<IconConfig/>}/> */}
           <button onClick={()=>handleClickLogoutUser()}>
                <IconSesion/>
                <span className='show-content-block' style={{color: '#c78790'}}>Cerrar Sesión</span>
            </button>
           {/* <ButtonCommon text="Cerrar Sesión" colorText="c78790" icon={<IconSesion/>}/> */}
        </footer>

        </section>
    )
}