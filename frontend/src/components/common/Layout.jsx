import '../../styles/common/MenuApp.css'
import { Outlet } from "react-router-dom"
import { MenuApp } from './Menuapp.jsx'
import { HeaderOption } from './HeaderOption.jsx'

export function Layout() {
    return (
        <section style={{display: 'flex'}}>
            <MenuApp />
            <section style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <HeaderOption />
                <Outlet />
            </section>
        </section>
    )
}