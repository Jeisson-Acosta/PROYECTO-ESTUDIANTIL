import '../../styles/common/MenuApp.css'

import { IconHatStudent } from "./IconsLayout.jsx"
import { IconDashboard, IconNotebook, IconClipboard, IconBars, IconSchedule } from "./IconsLayout.jsx"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { MenuApp } from './Menuapp.jsx'

export function Layout() {
    return (
        <>
            <MenuApp />
            <Outlet />
        </>
    )
}