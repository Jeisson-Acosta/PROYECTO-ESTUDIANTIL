import '../../styles/student/ClassDetails.css'
import { useContext, useEffect, useState } from "react"

import { UserLoginContext } from '../../context/userLogin.jsx'

import { CircleCheckIcon, BellRingingIcon, BookIcon, SpeakerPhone, MessagesIcon } from '../../components/common/GeneralIcons.jsx'

import { CardTaskClass } from '../../components/student/CardTaskClass.jsx'
import { HeaderClass } from '../../components/common/classes/HeaderClass.jsx'

import { useParams } from "react-router-dom"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import toast from "react-hot-toast"
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'

export function ClassDetails() {
    const [infoClass, setInfoClass] = useState({ info: null, tasks: null, tasksPending: null })
    const [tasksFiltered, setTasksFiltered] = useState([])
    const { userLogin } = useContext(UserLoginContext)
    const { setTitleHeaderOption } = useTitleHeaderOption()
    const { requestDB } = useRequestDB()
    const { asgcod } = useParams()

    useEffect(() => {
        const getInfoClass = async () => {

            const responseDB = await requestDB(`student/class/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${asgcod}`, 'GET')
            if (!responseDB.ok) return toast.error(responseDB.message)
            setInfoClass({
                info: JSON.parse(responseDB.data[0].info_asignatura),
                tasks: JSON.parse(responseDB.data[0].tasks_asignatura),
                tasksPending: responseDB.data[0].quantity_tasks_pending
            })
        }
        getInfoClass()
        setTitleHeaderOption('Detalles de la Asignatura')
    }, [])
    
    if (infoClass.info === null || infoClass.tasks === null) return null

    const buttonsToFilter = {
        C: { title: 'Calificados', icon: <CircleCheckIcon /> },
        P: { title: 'Pendientes', icon: <BellRingingIcon />, num: infoClass.tasksPending },
        MA: { title: 'Material', icon: <BookIcon /> },
        EN: { title: 'Enunciados', icon: <SpeakerPhone /> }
    }

    const handleClickFilter = (filter) => {
        // filter: Llega el filtro que se dio clic para hacer el filtrado. (C, P, MA, EN) -> Calificados, Pendientes, Material, Enunciados
        if (filter === 'C') {
            setTasksFiltered(infoClass.tasks.filter(task => task.ateestado === filter))
        } else if(filter === 'P'){
            setTasksFiltered(infoClass.tasks.filter(task => task.ateestado === filter))
        } else if(filter === 'MA'){
            setTasksFiltered(infoClass.tasks.filter(task => task.asttip === filter))
        } else if(filter === 'EN'){
            setTasksFiltered(infoClass.tasks.filter(task => task.asttip === filter))
        }
    }

    return (
        <section className="container-class">
            <HeaderClass infoClass={infoClass.info[0]} />
            <section className="buttons-to-filter">
                {Object.entries(buttonsToFilter).map(([key, value]) => (
                    <button key={key} className="button-filter" onClick={() => handleClickFilter(key)}>
                        {value.icon}
                        {value.title}
                        {value.num && <span className="num-filter">{value.num}</span>}
                    </button>
                ))}
            </section>
            <section style={{display: 'flex', gap: '20px'}}>
                <section className="body-class-details">
                    <ul className="tasks-class-list">
                        {infoClass.tasks.length === 0 && <h1>Aún no hay trabajos</h1>}
                        {tasksFiltered.length === 0 && infoClass.tasks.map(task => (<CardTaskClass key={task.astid} task={task} />))}
                        {tasksFiltered.length > 0 && (tasksFiltered.map(task => (<CardTaskClass key={task.astid} task={task} />)))}
                    </ul>
                    <section className="comments-docent-class">

                    </section>
                </section>

                <section className="messages-docent-container">
                    <header className='header-messages-docent'>
                        <div className="title-messages">
                            <MessagesIcon />
                            <h3>Últimos comentarios</h3>
                        </div>
                        <span style={{color: '#6b7280', marginTop: '16px'}}>
                            (del profesor)
                        </span>
                    </header>
                    
                </section>

            </section>
        </section>
    )
}