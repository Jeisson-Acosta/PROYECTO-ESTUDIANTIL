import '../../styles/common/MenuApp.css'
import { IconHatStudent, IconDashboard, IconNotebook, IconClipboard, IconBars, IconSchedule,IconMedal,IconConfig,IconSesion} from "./IconsLayout.jsx"
import { NavLink } from "react-router-dom"
import { useContext } from 'react'
import { UserLoginContext } from '../../context/userLogin.jsx'
import {ButtonCommon } from "./ButtonCommon.jsx"
import { UserIcon } from './GeneralIcons.jsx'

function CardPlanUser(){
    return(
        <section className="container-plan-user">
                <header>
                    <div className="icon-plan">
                        <IconMedal/>
                    </div>

                    <div className="info-plan-user">
                        <h5 className="text-module">Plan Pro</h5>
                        <p className="text-module">Educacion avanzada</p>
                    </div>
                </header>

                <ButtonCommon text="Ver planes"/>

        </section>
    )
}
export function MenuApp() {
    const { userLogin } = useContext(UserLoginContext)
    if (!userLogin) return null

    const COMPLEMENTED_URL = userLogin.rolcod === 'EST' ? 'student' : userLogin.rolcod === 'DOC' ? 'docent' : 'rector'
    
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

                </ul>
            </nav>
        <CardPlanUser/>
        <footer className="footer-menu-app">

            <section className='container-user-profile'>
                <div className='photo-user'>
                   <UserIcon/>
                </div>

                <div className='info-user'>
                    <h4 className="text-module">{userLogin.usunom}</h4>
                    <p className="text-module">{userLogin.rolnom}</p>
                </div>
            </section>
           <ButtonCommon text="Configuracion" icon={<IconConfig/>}/>
           <ButtonCommon text="Cerrar Sesión" colorText="c78790" icon={<IconSesion/>}/>
        </footer>

        </section>
    )
}