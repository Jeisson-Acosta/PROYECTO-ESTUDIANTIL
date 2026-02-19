import '../../styles/common/HeaderOption.css'
<<<<<<< HEAD
import { Iconbell } from './IconsLayout.jsx'
export function HeaderOption () {
   return (
    <header className='container-header-option'>
        <section className="header-info-option">
            <h1>Dashboard</h1>
            <p>Bienvenido de nuevo, <span className="name-user">Jorge</span>👋</p>
        </section>
        <section className="header-notifications">
         <Iconbell/>
        </section>
    </header>
   )
=======
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
>>>>>>> c0919f9de6975cb7fb8fb12a89bb151da056f0c0
}