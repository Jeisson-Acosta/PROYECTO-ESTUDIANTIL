import '../../styles/common/HeaderOption.css'
import { IconBell } from './IconsLayout.jsx'

export function HeaderOption() {
    return (
        <header className='container-header-option'>
            <section className="header-info-option">
                <h1>Dashboard</h1>
                <p>Bienvenido de nuevo, <span className="name-user">Jorge</span> 👋</p>
            </section>
            <section className="header-notifications">
                <IconBell />
            </section>
        </header>
    )
}