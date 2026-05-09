import '../../styles/common/HeaderOption.css'
import { IconBell } from './IconsLayout.jsx'
import { useContext } from 'react'
import { UserLoginContext } from '../../context/userLogin.jsx'
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'

export function HeaderOption() {
    const { userLogin } = useContext(UserLoginContext)
    const { titleHeaderOption } = useTitleHeaderOption()
    if (!userLogin.userInfo) return null
    
    return (
        <header className='container-header-option'>
            <section className="header-info-option">
                <h1>{titleHeaderOption}</h1>
                <p>Bienvenido de nuevo, <span className="name-user">{userLogin.userInfo.usunom}</span> 👋</p>
            </section>
            <section className="header-notifications">
                <IconBell />
            </section>
        </header>
    )
}