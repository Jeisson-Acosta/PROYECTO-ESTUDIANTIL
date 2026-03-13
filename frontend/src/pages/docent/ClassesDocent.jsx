import { useContext } from "react"
import { UserLoginContext } from "../../context/userLogin"
import '../../styles/docent/ClassesDocent.css'

export function ClassesDocent() {
    const { userLogin } = useContext(UserLoginContext)
    console.log(userLogin)
    return (
        <section className="container-classes-docent">
            <header className="header-classes-docent">
                <h2 className="welcome-docent">¡Bienvenido, Prof. {userLogin.usunom.split(' ')[0]}! <span style={{ fontSize: '30px' }}>👋</span></h2>
                <p className="description-header-class-docent">
                    Aqui puedes gestionar tus clases y acompañar el progreso de tus estudiantes.
                </p>
                <p style={{ color: '#f7e147' }}>
                    ¡No olvides estar al día con las calificaciones! 💡 
                </p>
                <div className="day-phrase">
                    <p>
                        <span style={{ color: '#feabd8', fontFamily: 'fontSubtitles' }}>Frase del día: </span>
                        "Cada clase es una oportunidad para inspirar." 🧠
                    </p>
                </div>
            </header>
            <ul className="list-classes-docent">
                
            </ul>
        </section>
    )
}