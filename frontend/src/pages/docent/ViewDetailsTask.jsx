import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import toast from "react-hot-toast"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"

import { UserLoginContext } from "../../context/userLogin.jsx"

import { CalendarIcon } from "../../components/common/GeneralIcons.jsx"

export function ViewDetailsTask() {

    const [taskDetails, setTaskDetails] = useState(null)
    const { asgcod, astid } = useParams()
    const { requestDB } = useRequestDB()
    const { userLogin } = useContext(UserLoginContext)

    useEffect(() => {
        const getTaskDetails = async () => {
            const responseDB = await requestDB(`docent/task-details/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${asgcod}/${astid}`, 'GET')
            if (!responseDB.ok) return toast.error(responseDB.message)
            responseDB.data[0].details_task = JSON.parse(responseDB.data[0].details_task)
            responseDB.data[0].student_submissions = JSON.parse(responseDB.data[0].student_submissions)
            setTaskDetails(responseDB.data[0])
        }
        getTaskDetails()
    }, [])

    if (!taskDetails) return null

    return (
        <section className="container-task-details-docent">
            <header className="header-task-details-docent">
                <div className="info-due-task">
                    <span>Tarea</span>
                    <span>
                        <CalendarIcon />
                        {taskDetails.details_task.astfecfin}
                    </span>
                </div>
                <div className="title-task">
                    <h1>{taskDetails.details_task.astnomtrabajo}</h1>
                    <span>{taskDetails.details_task.asgnom}</span>
                    <button>
                        Editar Tarea
                    </button>
                </div>
                <section className="description-task">
                    <header>
                        <h3>Detalles de la tarea</h3>
                        <span>Vision General</span>
                    </header>
                    <div className="description-task">
                        {taskDetails.details_task.astdesctrabajo}
                    </div>
                    <div className="files-submitted"></div>
                </section>
            </header>
        </section>
    )
}