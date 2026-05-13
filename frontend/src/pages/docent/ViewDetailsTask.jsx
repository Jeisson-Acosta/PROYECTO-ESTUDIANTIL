import '../../styles/docent/ViewDetailsTask.css'

import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import toast from "react-hot-toast"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"

import { UserLoginContext } from "../../context/userLogin.jsx"

import { CalendarIcon, PencilIcon, CircleCheckSingleIcon, ExclamationCircleIcon } from "../../components/common/GeneralIcons.jsx"
import { BuildTable } from '../../components/common/BuildTable.jsx'
import { CircleChart } from '../../components/common/charts/CircleChart.jsx'
import { AttachmentsFiles } from '../../components/common/classes/AttachmentsFiles.jsx'

function CardInfoTask({ title, quantity, bgColorIcon, bgColorBorder, icon }) {
    return (
        <div className="card-info-task" style={{borderColor: '#' + bgColorBorder}}>
            <div className="icon-card-info" style={{backgroundColor: '#' + bgColorIcon}}>
                {icon}
            </div>
            <div className="info-card-task">
                <h4>{title}</h4>
                <span>
                    <span className='quantity-number'>
                        {quantity}
                        {' '}
                    </span>
                    <span className='quantity-text'>
                        {quantity === 1 ? 'alumno' : 'alumnos'}
                    </span>
                </span>
            </div>
        </div>
    )
}

export function ViewDetailsTask() {

    const [taskDetails, setTaskDetails] = useState(null)
    const { asgcod, astid } = useParams()
    const { requestDB } = useRequestDB()
    const { userLogin } = useContext(UserLoginContext)

    console.log(userLogin)

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

    console.log(taskDetails)

    const columnsStudentSubmissions = [
        {
            header: 'Nombre del estudiante',
            accesorkey: 'name',
            cell: ({ row }) => (
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div
                        style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: '#E1F5EE', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#0F6E56'
                        }}
                    >
                        {row.original.usunom.split(' ')[0][0] + row.original.usunom.split(' ')[1][0]}
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14, fontFamily: 'fontSubtitles' }}>{row.original.usunom}</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{row.original.usuemail}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Fecha de entrega',
            accesorkey: 'atefec_entrega_text',
            cell: ({ row }) => (
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span>{row.original.atefec_entrega_text === null ? '-' : row.original.atefec_entrega_text}</span>
                </div>
            )
        },
        {
            header: 'Estado',
            accesorkey: 'ateestado',
            cell: ({ row }) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'fontSubtitles',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        color: row.original.ateestado === 'E' || row.original.ateestado === 'C' ? '#2b7b6e' : row.original.ateestado === 'P' ? '#757978' : '#b5822f',
                        backgroundColor: row.original.ateestado === 'E' || row.original.ateestado === 'C' ? '#cffcf3' : row.original.ateestado === 'P' ? '#dfe3e2' : '#fef9c3',
                        borderRadius: '16px',
                        padding: '4px 12px',
                        width: 'fit-content'
                    }}
                >
                    {row.original.ateestado === 'E' ? 'Entregado' : row.original.ateestado === 'C' ? 'Calificado' : row.original.ateestado === 'P' ? 'Pendiente' : 'Devuelto'}
                </div>
            )
        },
        {
            header: 'Calificación',
            accesorkey: 'rating',
            cell: ({ row }) => (
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{
                        fontFamily: 'fontSubtitles',
                        fontWeight: 'bold',
                        color: row.original.rating === null ? '#868888' : '#318579'
                    }}>
                        {row.original.rating === null ? '-' : row.original.rating} / 5.0
                    </span>
                </div>
            )
        }
    ]

    return (
        <section className="container-task-details-docent">
            <header className="header-task-details-docent">
                <div className="info-due-task">
                    <span style={{padding: '4px 18px', background: '#61f4d8', color: '#1d6c5b', borderRadius: '16px', fontFamily: 'fontSubtitles', fontSize: '14px'}}>
                        Tarea
                    </span>
                    <span className='date-due'>
                        <CalendarIcon />
                        Vencimiento: {taskDetails.details_task.astfecfin_text}
                    </span>
                </div>
                <div className="title-task">
                    <h1>{taskDetails.details_task.astnomtrabajo}</h1>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontFamily: 'fontSubtitles', color: '#8a8d8d'}}>
                            {taskDetails.details_task.asgnom}
                        </span>
                        <button className='btn-edit-task'>
                            <PencilIcon />
                            Editar Tarea
                        </button>
                    </div>
                </div>
            </header>
            <section className="general-container-content-task">
                <div className="content-left-grid">
                    <section className="description-task card-container">
                        <header>
                            <h3>Detalles de la tarea</h3>
                            <span>Vision General</span>
                        </header>
                        <div className="description-task-details-docent">
                            {taskDetails.details_task.astdesctrabajo}
                        </div>
                        <div className="files-submitted-details-docent">
                            {taskDetails.details_task.files !== null && <AttachmentsFiles resources={JSON.parse(taskDetails.details_task.files)} />}
                        </div>
                    </section>
                    <section className="students-submissions card-container">
                        <header>
                            <h3>Entregas de los estudiantes</h3>
                        </header>
                        {taskDetails.student_submissions.length === 0 ? (
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                                <span>Aún no hay entregas de los estudiantes</span>
                            </div>
                        ) : (
                            <BuildTable 
                                data={taskDetails.student_submissions}
                                columns={columnsStudentSubmissions}
                            />
                        )}
                    </section>
                </div>

                <div className="content-right-grid">
                    <section className="average-task card-container">
                        <header>
                            <h3>Promedio de la tarea</h3>
                            <span>Promedio general de los estudiantes en esta tarea</span>
                        </header>
                        <div className="average-task-details-docent">
                            <CircleChart 
                                endValue={100} 
                                value={taskDetails.average_task} 
                                color={'99c3bd'}
                                additionalText='%'
                                colorBlank={'fad9d8'}
                            />
                        </div>
                    </section>
                    <section className="cards-info-task">
                        <CardInfoTask 
                            title='ENTREGADOS'
                            quantity={taskDetails.quantity_deliverieds}
                            bgColorIcon='e5f0ee'
                            bgColorBorder='076c5d'
                            icon={<CircleCheckSingleIcon />}
                        />
                        <CardInfoTask 
                            title='NO ENTREGADOS'
                            quantity={taskDetails.without_deliverings}
                            bgColorIcon='fbf3f4'
                            bgColorBorder='b31b25'
                            icon={<ExclamationCircleIcon />}
                        />
                    </section>
                </div>

            </section>
        </section>
    )
}