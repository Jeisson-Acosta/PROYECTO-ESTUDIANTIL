import '../../styles/rector/CoursesRector.css'
import { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../context/userLogin.jsx"

import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { useTitleHeaderOption } from "../../hooks/common/useTitleHeaderOption.js"
import { useFilterAsignatures } from '../../hooks/rector/useFilterAsignatures.js';

import toast from "react-hot-toast"

import { BookIcon, CircleCheckSingleIcon, ExclamationCircleIcon, EyeBlueIcon, EyeIcon, PlusIcon } from "../../components/common/GeneralIcons.jsx";
import { CardInfoAsignature } from "../../components/rector/CardInfoAsignaure.jsx"
import { BuildTable } from '../../components/common/BuildTable.jsx'
import { getIconUrl } from '../../utils/getIconUrl.js'

export function CoursesRector() {

    const [dataAsignatures, setDataAsignatures] = useState(null)
    const { userLogin } = useContext(UserLoginContext)
    const { setTitleHeaderOption } = useTitleHeaderOption()
    const { requestDB } = useRequestDB()
    const { filters, dataAsignatureFiltered, handleChangeFilterOption } = useFilterAsignatures({ dataAsignatures })

    const handleClickViewAsignature = (asgid) => {
        alert(asgid)
    }

    const columnsTableAsignatures = [
        {
           header: 'NOMBRE DE LA ASIGNATURA',
           accesorkey: 'asgnom',
           cell: ({ row }) => {
            const visualConfig = typeof row.original.ascvis_config === 'string' ? JSON.parse(row.original.ascvis_config) : row.original.ascvis_config;
            const { color, iconName } = visualConfig || { color: '6C63FF', iconName: 'bicycle' };
            
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="icon-asignaure-table" style={{ backgroundColor: `#${color}25`, padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={getIconUrl(iconName)} alt={iconName} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h5 style={{ fontFamily: 'fontTitlesBold', color: '#1e293b', fontSize: '14px', margin: 0 }}>{row.original.asgnom}</h5>
                    </div>
                </div>
            )
           } 
        },
        {
           header: 'CURSO',
           accesorkey: 'edcnom',
           cell: ({ row }) => {
            return (
                <h3 style={{fontFamily: 'fontSubtitles', color: '#0d1422', fontSize: '13px'}}>{row.original.edcnom}</h3>
            )
           } 
        },
        {
           header: 'DOCENTE ASIGNADO',
           accesorkey: 'usrnom',
           cell: ({ row }) => {
            return (
                <h3 style={{fontFamily: 'fontSubtitles', color: '#0d1422', fontSize: '13px'}}>{row.original.usrnom}</h3>
            )
           } 
        },
        {
           header: 'CODIGO',
           accesorkey: 'asgcod_clase',
           cell: ({ row }) => {
            return (
                <h3 style={{fontFamily: 'fontSubtitles', color: '#0d1422', fontSize: '13px'}}>{row.original.asgcod_clase}</h3>
            )
           } 
        },
        {
           header: 'ESTADO',
           accesorkey: 'asgestado',
           cell: ({ row }) => {
            return (
                <div style={{
                    padding: '8px 14px',
                    borderRadius: '16px',
                    color: row.original.asgestado === 'A' ? '#065f46': '#1e293b',
                    fontFamily: 'fontTitlesBold',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    width: 'fit-content',
                    backgroundColor: row.original.asgestado === 'A' ? '#d1fae5' : '#f1f5f9',
                    border: '1px solid #' + row.original.asgestado === 'A' ? 'bbf6da' : 'bbf6da'
                }}>
                    {row.original.asgestado === 'A' ? 'ACTIVO' : 'INACTIVO'}
                </div>
            )
           } 
        },
        {
           header: 'ACCIONES',
           accesorkey: 'actions',
           cell: ({ row }) => {
            return (
                <button 
                    onClick={() => handleClickViewAsignature(row.original.asgid)}
                    className='button-view-asignature'
                >
                    <EyeIcon />
                    Ver asignatura
                </button>
            )
           } 
        }
    ]

    useEffect(() => {
        const getAllAsignaturesInfo = async () => {
            const responseDB = await requestDB(`rector/all-asignatures-info/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}`, 'GET')
            if (!responseDB.ok) return toast.error(responseDB.message)
            setDataAsignatures({
                info_cards: JSON.parse(responseDB.data[0].info_cards),
                info_table: responseDB.data[0].info_table
            })
        }
        getAllAsignaturesInfo()
        setTitleHeaderOption('Gestión de Asignaturas')

    }, [])

    if (dataAsignatures === null) return

    console.log(dataAsignatures)

    return (
        <section className="principal-container-asignatures-rector">
            <header className="header-asignatures-rector">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
                    <p style={{color: '#4c79a0', fontFamily: 'fontSubtitles'}}>
                        Administra, organiza y supervisa el plan de estudio académico de toda la institución
                    </p>
                    <button className='button-create-new-course'>
                        <PlusIcon />
                        Crear Nuevo Curso
                    </button>
                </div>
                <div className="cards-info-asignatures">
                    <CardInfoAsignature 
                        title={'Total Asignaturas'}
                        bgColorIcon={'#eff6ff'}
                        icon={<BookIcon />}
                        valueCard={dataAsignatures.info_cards.total_asignatures}
                        className={'total-asignatures'}
                    />
                    <CardInfoAsignature 
                        title={'Asignaturas Activas'}
                        bgColorIcon={'#ecfdf5'}
                        icon={<CircleCheckSingleIcon />}
                        valueCard={dataAsignatures.info_cards.quantity_active_asignatures}
                        className={'active-asignatures'}
                    />
                    <CardInfoAsignature 
                        title={'Asignaturas Inactivas'}
                        bgColorIcon={'#fffbeb'}
                        icon={<ExclamationCircleIcon />}
                        valueCard={dataAsignatures.info_cards.quantity_inactive_asignatures}
                        className={'inactive-asignatures'}
                    />
                </div>
            </header>
            <section className="main-container-asignaures-rector">
                <header className="container-filters">
                    <input 
                        type="text"
                        placeholder="Buscar por nombre, código o docente..."
                        className="input-search-asignatures" 
                        value={filters.search}
                        name='search'
                        onChange={handleChangeFilterOption}
                    />
                    <select 
                        name="asgestado_option"
                        id="asgestado_option"
                        value={filters.asgestado_option}
                        onChange={handleChangeFilterOption}
                        className="select-filter-asignatures"
                    >
                        <option value="T">Todos</option>
                        <option value="A">Activos</option>
                    </select>
                </header>
                <div className="table-info-asignatures-rector">
                    <BuildTable 
                        columns={columnsTableAsignatures}
                        data={dataAsignatureFiltered === null ? dataAsignatures.info_table : dataAsignatureFiltered}
                        className={'table-info-asignaures-rector'}
                    />
                </div>
            </section>
        </section>
    );
}