import '../../styles/student/ClassDetails.css'
import { useEffect, useState } from "react"

import { UserNotFilledIcon, ClockIcon, CircleCheckIcon, BellRingingIcon, BookIcon, SpeakerPhone } from '../../components/common/GeneralIcons.jsx'

import * as Background from '../../components/common/BackgroundsClasses.jsx'
import { CardTaskClass } from '../../components/student/CardTaskClass.jsx'

import { getIconUrl } from "../../utils/getIconUrl.js"
import { hexToRgba } from '../../utils/hexToRgba.js'

import { useParams } from "react-router-dom"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import toast from "react-hot-toast"

export function ClassDetails() {
    const [infoClass, setInfoClass] = useState({ info: null, tasks: null, tasksPending: null })
    const { requestDB } = useRequestDB()
    const { asgcod } = useParams()

    useEffect(() => {
        const getInfoClass = async () => {
            const responseDB = await requestDB(`student/class/${asgcod}`, 'GET')
            if (!responseDB.ok) return toast.error(responseDB.message)
            setInfoClass({
                info: JSON.parse(responseDB.data[0].info_asignatura),
                tasks: JSON.parse(responseDB.data[0].tasks_asignatura),
                tasksPending: responseDB.data[0].quantity_tasks_pending
            })
        }
        getInfoClass()
    }, [])
    
    if (infoClass.info === null || infoClass.tasks === null) return null

    const BackgroundComponent = Background['Background' + infoClass.info[0].ascvis_config.backgroundName]
    const buttonsToFilter = {
        C: { title: 'Calificados', icon: <CircleCheckIcon /> },
        P: { title: 'Pendientes', icon: <BellRingingIcon />, num: infoClass.tasksPending },
        MA: { title: 'Material', icon: <BookIcon /> },
        EN: { title: 'Enunciados', icon: <SpeakerPhone /> }
    }

    const handleClickFilter = (filter) => {
        // filter: Llega el filtro que se dio clic para hacer el filtrado. (C, P, MA, EN) -> Calificados, Pendientes, Material, Enunciados
        alert(filter)
    }

    return (
        <section className="container-class">
            <header className="header-class">
                <div className="background-wrapper">
                    {BackgroundComponent && <BackgroundComponent />}
                </div>
                <div className="icon-class-header">
                    <img src={getIconUrl(infoClass.info[0].ascvis_config.iconName)} alt="Icono de clase" width="220px" height="160px" />
                </div>
                <div className="code-class" style={{backgroundColor: hexToRgba(infoClass.info[0].ascvis_config.color) }}>
                    Código: {infoClass.info[0].asgcod_clase}
                </div>
                <div className="info-class">
                    <h1 className='title-class'>{infoClass.info[0].asgnom}</h1>
                    <div className="info-complement-class">
                        <p className='teacher-class'>
                            <UserNotFilledIcon />
                            Prof. {infoClass.info[0].usunom}
                        </p>
                        <p className='classroom-class'>
                            <ClockIcon />
                            Lun, Mie 10:00 - 11:30 AM
                        </p>
                    </div>
                </div>
            </header>
            <section className="buttons-to-filter">
                {Object.entries(buttonsToFilter).map(([key, value]) => (
                    <button key={key} className="button-filter" onClick={() => handleClickFilter(key)}>
                        {value.icon}
                        {value.title}
                        {value.num && <span className="num-filter">{value.num}</span>}
                    </button>
                ))}
            </section>
            <section className="body-class-details">
                <ul className="tasks-class-list">
                    {infoClass.tasks.length === 0 && <h1>Aún no hay trabajos</h1>}
                    {infoClass.tasks.map(task => (<CardTaskClass key={task.astid} task={task} />))}
                </ul>
                <section className="comments-docent-class">

                </section>
            </section>
        </section>
    )
}