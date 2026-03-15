import '../../styles/docent/ClassesDocent.css'
import { useContext, useEffect, useState } from "react"
import { UserLoginContext } from "../../context/userLogin"

import { useRequestDB } from "../../hooks/utils/useRequestDB.js"

import { PlusIcon } from "../../components/common/GeneralIcons.jsx"

import toast from "react-hot-toast"
import { CardClassDocent } from '../../components/docent/CardClassDocent.jsx'

export function ClassesDocent() {
    const [classesDocent, setClassesDocent] = useState(null)
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()

    useEffect(() => {
        const getClassesDocent = async () => {
            const response = await requestDB(`docent/classes/${userLogin.usuid}`)
            if (!response.ok) return toast.error(response.message)
            setClassesDocent(response.data[0].info_classes_docent)
        }
        getClassesDocent()
    }, [])

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
            <ul className="list-classes">
                {classesDocent === null && (<h2>No tienes clases asignadas</h2>)}

                {classesDocent?.map(classDocent => (<CardClassDocent key={classDocent.asgid} classDocent={classDocent} />))}

                <button className="assign-new-class">
                    <PlusIcon />
                    Asignar nueva clase
                </button>
            </ul>
        </section>
    )
}