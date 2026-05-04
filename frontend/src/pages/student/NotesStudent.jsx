import '../../styles/student/NotesStudent.css'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { ButtonCommon } from '../../components/common/ButtonCommon.jsx'
import { useEffect, useState, useContext } from 'react'
import { DownloadIcon, FileAnalyticsIcon, ListCheckIcon, CircleCheckIcon, ClockIcon, HourglassIcon, ArrowsDownIcon } from '../../components/common/GeneralIcons'
import { BuildTable } from '../../components/common/BuildTable.jsx'

import { UserLoginContext } from '../../context/userLogin.jsx'
import toast from 'react-hot-toast'

function CardInfoNotesStudent({ title, value, bgColorIcon, icon, classNameIcon = '' }) {
    return (
        <div className="card-info-notes-student">
            <div className='title-card'>
                <h5>{title}</h5>
            </div>
            <div className='container-value-and-icon-card'>
                <h1 className='value-card'>
                    {value}
                </h1>
                <div className={`icon-card ${classNameIcon}`} style={{ backgroundColor: bgColorIcon }}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export function NotesStudent() {
    const { userLogin } = useContext(UserLoginContext)
    const [infoTasks, setInfoTasks] = useState(null)
    const [selectedOption, setSelectedOption] = useState('STK') // (STK) See TasKs (Ver tareas),  (SDN) See Definitive Notes (Ver notas definitivas)
    const { requestDB } = useRequestDB()

    useEffect(() => {

        const getInfoTasks = async () => {
            setInfoTasks(null)
            const responseDB = await requestDB(`student/notes/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${userLogin.userInfo.usuid}/${selectedOption}`)
            if (!responseDB.ok) return toast.error(responseDB.message)
            setInfoTasks(responseDB.data)
        }
        getInfoTasks()
    }, [selectedOption])

    const columnsTableNotesStudent = []

    if (infoTasks === null) return <h1>Loading...</h1>
    
    return (
        <section className='principal-container-notes-student'>
            <header className='header-notes-student'>
                <div className="buttons-actions">
                    <div className="buttons-options-to-select">
                        <button 
                            onClick={() => setSelectedOption('STK')}
                            className={`${selectedOption === 'STK' ? 'selected' : ''}`}
                        >
                            <ListCheckIcon />
                            Ver tareas
                        </button>
                        <button 
                            onClick={() => setSelectedOption('SDN')}
                            className={`${selectedOption === 'SDN' ? 'selected' : ''}`}
                        >
                            <FileAnalyticsIcon />
                            Ver notas definitivas
                        </button>
                    </div>
                    <div className='container-btn-download-notes'>
                        <ButtonCommon 
                            text={'Descargar notas'}
                            colorText='8a4918'
                            icon={<DownloadIcon />}
                        />
                    </div>
                </div>
                <div className="cards-info-notes-student">
                    <CardInfoNotesStudent 
                        title={'ENTREGADAS'}
                        value={infoTasks[0].info_cards.total_tasks_deliveries}
                        icon={<CircleCheckIcon />}
                        bgColorIcon={'#ecfdf5'}
                    />
                    <CardInfoNotesStudent 
                        title={'SIN ENTREGAR'}
                        value={infoTasks[0].info_cards.total_tasks_without_deliveried}
                        icon={<ClockIcon />}
                        bgColorIcon={'#eff6ff'}
                        classNameIcon={'icon-card-clock'}
                    />
                    <CardInfoNotesStudent 
                        title={'SIN CALIFICAR'}
                        value={infoTasks[0].info_cards.total_tasks_without_qualified}
                        icon={<HourglassIcon />}
                        bgColorIcon={'#faf5ff'}
                    />
                    <CardInfoNotesStudent 
                        title={'NOTAS BAJAS'}
                        value={infoTasks[0].info_cards.quantity_low_notes}
                        icon={<ArrowsDownIcon />}
                        bgColorIcon={'#fff1f2'}
                    />
                </div>
            </header>
        </section>
    )
}