import { IconHatStudent, IconDashboard, IconNotebook, IconClipboard, IconBars, IconSchedule } from "./IconsLayout.jsx"
import '../../styles/common/MenuApp.css'
import { NavLink } from "react-router-dom"
export function MenuApp() {
    return (
        <section className="principal-container-menu">
            <header className="header-menu">
                <div className="header-icon">
                    <IconHatStudent />
                </div>
                <h2 className="header-title-app">
                   <span className="text-module">  CEFCOC </span>
                </h2>
            </header>
            <nav className="modules-menu">
                <ul>
                    <NavLink to={'/dashboard'}>
                        <li>
                            <IconDashboard />
                           <span className="text-module"> Dashboard </span>
                        </li>
                    </NavLink>
                    <NavLink to={'/cursos'}>
                        <li>
                            <IconNotebook />
                            <span className="text-module">Cursos</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/tareas'}>
                        <li style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <IconClipboard />
                               <span className="text-module">Tareas</span>  
                            </div>
                            <span className="counter-quantity-tasks"style={{display: 'none'}}>5</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/notas'}>
                        <li>
                            <IconBars />
                           <span className="text-module">Notas</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/calendario'}>
                        <li>
                            <IconSchedule />
                            <span className="text-module">Calendario</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </section>
    )
}

