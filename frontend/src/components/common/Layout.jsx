import '../../styles/common/MenuApp.css'
import { Outlet } from "react-router-dom"
import { MenuApp } from './Menuapp.jsx'
import { HeaderOption } from './HeaderOption.jsx'
import { Stats } from './Stats.jsx'

export function Layout() {
    return (
        <section style={{display: 'flex'}}>
            <MenuApp />
            <section style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <HeaderOption />
                <Outlet />
                <Stats />
            </section>
        </section>
    )
}