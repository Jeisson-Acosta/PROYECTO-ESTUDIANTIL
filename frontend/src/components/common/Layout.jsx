import '../../styles/common/MenuApp.css'

import { IconHatStudent } from "./IconsLayout.jsx"
import { IconDashboard, IconNotebook, IconClipboard, IconBars, IconSchedule } from "./IconsLayout.jsx"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"

function MenuApp() {
    return (
        <section className="principal-container-menu">
            <header className="header-menu">
                <div className="header-icon">
                    <IconHatStudent />
                </div>
                <h2 className="header-title-app">
                    CEFCOC
                </h2>
            </header>
            <nav className="modules-menu">
                <ul>
                    <NavLink to={'/dashboard'}>
                        <li>
                            <IconDashboard />
                            Dashboard
                        </li>
                    </NavLink>
                    <NavLink to={'/cursos'}>
                        <li>
                            <IconNotebook />
                            Cursos
                        </li>
                    </NavLink>
                    <NavLink to={'/tareas'}>
                        <li style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <IconClipboard />
                                Tareas
                            </div>
                            <span className="counter-quantity-tasks">5</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/notas'}>
                        <li>
                            <IconBars />
                            Notas
                        </li>
                    </NavLink>
                    <NavLink to={'/calendario'}>
                        <li>
                            <IconSchedule />
                            Calendario
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </section>
    )
}

export function Layout() {
    return (
        <>
            <MenuApp />
            <Outlet />
        </>
    )
}