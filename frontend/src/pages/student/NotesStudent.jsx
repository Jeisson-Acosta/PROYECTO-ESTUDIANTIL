import '../../styles/student/NotesStudent.css'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { ButtonCommon } from '../../components/common/ButtonCommon.jsx'
import { useEffect, useState, useContext } from 'react'
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'

import { DownloadIcon, FileAnalyticsIcon, ListCheckIcon, CircleCheckIcon, ClockIcon, HourglassIcon, ArrowsDownIcon } from '../../components/common/GeneralIcons'
import { BuildTable } from '../../components/common/BuildTable.jsx'
import { CardInfoNotesStudent } from '../../components/student/CardInfoNotesStudent.jsx'

import { UserLoginContext } from '../../context/userLogin.jsx'
import toast from 'react-hot-toast'


export function NotesStudent() {
    const { userLogin } = useContext(UserLoginContext)
    const { setTitleHeaderOption } = useTitleHeaderOption()
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
        setTitleHeaderOption('Notas')
    }, [selectedOption])

    const columnsTableNotesStudent = [
        {
            header: 'PERIODO',
            accessorKey: 'cecnom',
            cell: ({ getValue }) => { return getValue() }
        },
        {
            header: 'CLASE',
            accessorKey: 'asgnom',
            cell: ({ getValue }) => { return getValue() }
        },
        {
            header: 'TITULO DEL TRABAJO',
            accessorKey: 'astnomtrabajo',
            cell: ({ getValue }) => { return <strong>{getValue()}</strong> }
        },
        {
            header: 'FECHA LIMITE',
            accessorKey: 'astfecfin',
            cell: ({ getValue }) => { return getValue() }
        },
        {
            header: 'FECHA ENTREGA',
            accessorKey: 'atefec_entrega',
            cell: ({ getValue }) => { return getValue() === null ? '---' : getValue() }
        },
        {
            header: 'NOTA',
            accessorKey: 'atccalificacion',
            cell: ({ getValue }) => { 
                const noteValue = getValue() === null ? 'Sin calificar': getValue()
                return (
                    <span style={{
                        fontWeight: 'bold', padding: '4px 16px', borderRadius: '10px',
                        fontFamily: 'fontSubtitles',
                        fontSize: '14px',
                        margin: '0 auto',
                        display: 'block',
                        textAlign: 'center',
                        width: 'fit-content',
                        color: noteValue >= 4.0 ? '#057958' : noteValue >= 3.0 ? '#b5550b' : noteValue < 3.0 ? '#bf1740' : '#6d28d9',
                        backgroundColor: noteValue >= 4.0 ? '#d1fae5' : noteValue >= 3.0 ? '#fef3c7' : noteValue < 3.0 ? '#ffe4e6' : '#ede9fe'
                    }}>
                        {noteValue}
                    </span>
                )
             }
        }
    ]

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
            <section className='table-container-notes-student' style={{maxHeight: '420px', overflow: 'auto'}}>
                <BuildTable 
                    data={infoTasks[0].list_tasks}
                    columns={columnsTableNotesStudent}
                />
            </section>
        </section>
    )
}