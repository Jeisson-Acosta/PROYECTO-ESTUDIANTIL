import '../../styles/docent/ClassesDocent.css'
import { useContext, useEffect, useState } from "react"
import { UserLoginContext } from "../../context/userLogin"
import { AssignNewClassModalContext } from '../../context/docent/assignNewClassModal.jsx'
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"

import { PlusIcon } from "../../components/common/GeneralIcons.jsx"
import { AssignNewClass } from '../../components/docent/AssignNewClass.jsx'

import toast from "react-hot-toast"
import { CardClassDocent } from '../../components/docent/CardClassDocent.jsx'

export function ClassesDocent() {
    const [classesDocent, setClassesDocent] = useState(null)
    const { userLogin } = useContext(UserLoginContext)
    const {showModalAssignNewClass,setShowModalAssignNewClass} = useContext(AssignNewClassModalContext)
    const { requestDB } = useRequestDB()
    const { currentClass } = useCurrentClass()

    useEffect(() => {
        const getClassesDocent = async () => {
            const response = await requestDB(`docent/classes/${userLogin.userInfo.usuid}`)
            if (!response.ok) return toast.error(response.message)
            setClassesDocent(response.data[0].info_classes_docent)
        }
        getClassesDocent()
    }, [currentClass])

    return (
        <section className="container-classes-docent">
            <header className="header-classes-docent">
                <h2 className="welcome-docent">¡Bienvenido, Prof. {userLogin.userInfo.usunom.split(' ')[0]}! <span style={{ fontSize: '30px' }}>👋</span></h2>
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

                <button className="assign-new-class" onClick={()=>setShowModalAssignNewClass(true)}>
                    <PlusIcon />
                    Asignar nueva clase
                </button>
            </ul>
            {showModalAssignNewClass && <AssignNewClass />}
        </section>
    )
}