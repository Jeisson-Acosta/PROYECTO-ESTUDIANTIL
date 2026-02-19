<<<<<<< HEAD

import { Outlet } from "react-router-dom"
import { MenuApp } from './Menuapp.jsx'
=======
import { Outlet } from "react-router-dom"
import { MenuApp } from './MenuApp.jsx'
>>>>>>> c0919f9de6975cb7fb8fb12a89bb151da056f0c0
import { HeaderOption } from "./HeaderOption.jsx"

export function Layout() {
    return (
<<<<<<< HEAD
       
        <>
         <section style={{display: 'flex'}}>
            <MenuApp />
            <HeaderOption/>
            <Outlet />
             </section>
        </>
       
=======
        <section style={{display: 'flex'}}>
            <MenuApp />
            <HeaderOption />
            <Outlet />
        </section>
>>>>>>> c0919f9de6975cb7fb8fb12a89bb151da056f0c0
    )
}