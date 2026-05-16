import { createContext, useContext, useState } from "react"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import { UserLoginContext } from "../userLogin.jsx"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import nutraSaludando from "../../assets/nutria_saludando_2.gif"
import "../../styles/common/WelcomeTourModal.css"
import toast from "react-hot-toast"

export const MakeTourContext = createContext()

const WELCOME_MESSAGES = {
    DOC: {
        title: "¡Bienvenido, Docente!",
        body: "Aquí encontrarás todo lo que necesitas para gestionar tus cursos, calificar tareas y hacer seguimiento al rendimiento de tus estudiantes. ¡Explora cada sección!"
    },
    EST: {
        title: "¡Bienvenido, Estudiante!",
        body: "Este es tu espacio académico. Aquí podrás ver tus notas, tareas, calendario y mucho más. ¡Empieza a explorar!"
    },
    REC: {
        title: "¡Bienvenido, Rector!",
        body: "Desde aquí podrás gestionar toda la institución, ver el rendimiento general y administrar los cursos y docentes. ¡Todo bajo control!"
    }
}

function WelcomeModal({ onClose }) {
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const rolcod = userLogin?.userInfo?.rolcod
    const message = WELCOME_MESSAGES[rolcod] || {
        title: "¡Bienvenido a CEFCOCAPP!",
        body: "Explora la plataforma y descubre todas las herramientas disponibles para ti."
    }

    const changeStateUser = async () => {
        const resultDB = await requestDB('auth/change-state-user', 'PUT', { usuid: String(userLogin.userInfo.usuid) })
        if (!resultDB.ok) return toast.error(resultDB.message)
    }

    return (
        <div className="welcome-tour-overlay" onClick={onClose}>
            <div className="welcome-tour-modal" onClick={(e) => e.stopPropagation()}>
                <img
                    src={nutraSaludando}
                    alt="Nutria saludando"
                    className="welcome-tour-gif"
                />
                <h2 className="welcome-tour-title">{message.title}</h2>
                <p className="welcome-tour-body">{message.body}</p>
                <button className="welcome-tour-btn" onClick={() => {onClose(); changeStateUser()}}>
                    ¡Entendido, vamos!
                </button>
            </div>
        </div>
    )
}

export function MakeTourProvider({ children }) {
    const [showWelcomeModal, setShowWelcomeModal] = useState(false)

    function startTour(steps) {
        const driverObj = driver({
            showProgress: true,
            steps,
            onDestroyed: () => {
                setShowWelcomeModal(true)
            }
        })
        driverObj.drive()
    }

    return (
        <MakeTourContext.Provider value={{ startTour }}>
            {children}
            {showWelcomeModal && (
                <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
            )}
        </MakeTourContext.Provider>
    )
}
