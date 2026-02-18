import { Outlet } from "react-router-dom"
import { MenuApp } from './MenuApp.jsx'
import { HeaderOption } from "./HeaderOption.jsx"

export function Layout() {
    return (
        <section style={{display: 'flex'}}>
            <MenuApp />
            <HeaderOption />
            <Outlet />
        </section>
    )
}