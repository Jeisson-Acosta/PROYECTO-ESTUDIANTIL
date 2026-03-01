import '../../styles/common/HeaderOption.css'
import { IconBell } from './IconsLayout.jsx'
import { useContext } from 'react'
import { UserLoginContext } from '../../context/userLogin.jsx'

export function HeaderOption() {
    const { userLogin } = useContext(UserLoginContext)
    if (!userLogin) return null
    
    return (
        <header className='container-header-option'>
            <section className="header-info-option">
                <h1>Dashboard</h1>
                <p>Bienvenido de nuevo, <span className="name-user">{userLogin.usunom}</span> 👋</p>
            </section>
            <section className="header-notifications">
                <IconBell />
            </section>
        </header>
    )
}