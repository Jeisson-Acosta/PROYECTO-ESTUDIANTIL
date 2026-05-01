import { useState } from 'react'
import '../../styles/docent/Attendance.css'

import { BuildTable } from "../../components/common/BuildTable.jsx"
import { FileAnalyticsIcon, MessageIcon, SaveIcon, CalendarIcon, DocxIcon, PdfIcon } from '../../components/common/GeneralIcons.jsx'
import { ButtonCommon } from '../../components/common/ButtonCommon.jsx'
import { CardAttendance } from '../../components/docent/CardAttendance.jsx'
import { DateSelector } from '../../components/common/DateSelector.jsx'

import { useAttendance } from '../../hooks/docent/useAttendance.js'


function generarColorPastel(seed = '') {
    const paleta = [
        { bg: '#E8D5F5', text: '#7C3AED' }, // Morado
        { bg: '#D1F5E8', text: '#059669' }, // Verde
        { bg: '#FFE4D6', text: '#EA580C' }, // Naranja
        { bg: '#D6E8FF', text: '#2563EB' }, // Azul
        { bg: '#FFD6E8', text: '#DB2777' }, // Rosa
        { bg: '#FFF3D6', text: '#D97706' }, // Amarillo
        { bg: '#D6F5F5', text: '#0891B2' }, // Cyan
        { bg: '#F5D6D6', text: '#DC2626' }, // Rojo
        { bg: '#D6D6F5', text: '#4F46E5' }, // Indigo
        { bg: '#E8F5D6', text: '#65A30D' }, // Lima
    ]

    // Se usa el seed (nombre o ID) para que el color sea siempre el mismo por persona
    const index = seed
        ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % paleta.length
        : Math.floor(Math.random() * paleta.length)

    return paleta[index]
}

export function Attendance() {
    const [showModalReport, setShowModalReport] = useState(false)
    const [periodTypeReport, setPeriodTypeReport] = useState('today')

    const {
        attendance,
        listStudents,
        selectedDate,
        setSelectedDate,
        handleClickButtonStatus,
        markAllPresent,
        handleClickSaveAttendance
    } = useAttendance()

    const getPresentStudents = attendance.filter(att => att.status === 'P').length
    const getAbsentStudents = attendance.filter(att => att.status === 'A').length
    const getLateStudents = attendance.filter(att => att.status === 'T').length
    const getExcusedStudents = attendance.filter(att => att.status === 'E').length

    const columnsTableAttendance = [
        {
            header: 'Estudiante',
            accessorKey: 'name',
            cell: ({ row }) => {
                const { bg, text } = generarColorPastel(row.original.usunom)
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: bg , display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 'bold', color: text,
                            fontFamily: 'fontSubtitles'
                        }}>
                            {row.original.usunom.split(' ')[0][0].toUpperCase() + row.original.usunom.split(' ')[1][0].toUpperCase()}
                        </div>
                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14, fontFamily: 'fontSubtitles' }}>{row.original.usunom}</p>
                    </div>
                )
            }
        },
        {
            header: 'Estado',
            accessorKey: 'status',
            cell: ({ row }) => {
                const studentState = attendance.find(att => att.usuid === row.original.usuid)
                const currentStatus = studentState ? studentState.status : null

                return (
                    <div className="container-buttons-status-attendance">
                        <button
                            onClick={(event) => handleClickButtonStatus(event, 'P', row.original.usuid)}
                            className={currentStatus === 'P' ? 'selected present': ''}
                        >
                            P
                        </button>
                        <button 
                            onClick={(event) => handleClickButtonStatus(event, 'A', row.original.usuid)}
                            className={currentStatus === 'A' ? 'selected absent': ''}
                        >
                            A
                        </button>
                        <button
                            onClick={(event) => handleClickButtonStatus(event, 'T', row.original.usuid)}
                            className={currentStatus === 'T' ? 'selected late': ''}
                        >
                            T
                        </button>
                        <button 
                            onClick={(event) => handleClickButtonStatus(event, 'E', row.original.usuid)}
                            className={currentStatus === 'E' ? 'selected excused': ''}
                        >
                            E
                        </button>
                    </div>
                )
            }
        },
        {
            header: 'Observación',
            accessorKey: 'obs',
            cell: () => (
                <button style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                }}
                >
                    <MessageIcon />
                </button>
            )
        }
    ]

    return (
        <section className="principal-container-attendance-docent">
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '12px'}}>
                <DateSelector 
                    initialDate={selectedDate} 
                    onChangeDate={(date) => setSelectedDate(date)} 
                />
            </div>
            <div className="cards-attendance-info">
                <CardAttendance 
                    title={'PRESENTES'}
                    value={getPresentStudents}
                    colorNumber={'#059669'}
                    bgColorCircle={'#ecfdf5'}
                />
                <CardAttendance 
                    title={'AUSENTES'}
                    value={getAbsentStudents}
                    colorNumber={'#e11d48'}
                    bgColorCircle={'#fff1f2'}
                />
                <CardAttendance 
                    title={'TARDANZAS'}
                    value={getLateStudents}
                    colorNumber={'#f59e0b'}
                    bgColorCircle={'#fffbeb'}
                />
                <CardAttendance 
                    title={'EXCUSADOS'}
                    value={getExcusedStudents}
                    colorNumber={'#3b82f6'}
                    bgColorCircle={'#eff6ff'}
                />
            </div>

            {/* Modal de Generar Reporte */}
            {showModalReport && (
                <>
                    {/* Fondo oscuro opaco */}
                    <div 
                        style={{position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 998}}
                        onClick={() => setShowModalReport(false)}
                    ></div>
                    
                    {/* Contenedor del Modal */}
                    <div className="modal-generate-report">
                        <h3 style={{ margin: 0, fontFamily: 'fontTitlesBold', color: '#1e293b', fontSize: '18px' }}>
                            Generar Reporte
                        </h3>
                        
                        <div className='container-options-period-report' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontFamily: 'fontSubtitles', color: '#64748b', fontWeight: 'bold' }}>PERIODO</label>
                            <button>
                                <CalendarIcon />
                                Hoy
                            </button>
                            <button>
                                <CalendarIcon />
                                Últimos 7 días
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontFamily: 'fontSubtitles', color: '#64748b', fontWeight: 'bold' }}>FORMATO</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontFamily: 'fontSubtitles', fontWeight: 600, backgroundColor: '#f8fafc' }}>
                                <PdfIcon /> PDF
                            </div>
                        </div>

                        <button style={{
                            marginTop: '6px', padding: '12px', backgroundColor: '#8b5cf6', color: 'white',
                            border: 'none', borderRadius: '8px', fontFamily: 'fontTitlesBold', fontSize: '15px',
                            cursor: 'pointer', transition: 'background-color 0.2s', textAlign: 'center'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
                        >
                            Generar PDF
                        </button>
                    </div>
                </>
            )}

            <section className='container-generate-report'>
                <button className='btn-generate-report' onClick={() => setShowModalReport(true)}>
                    <FileAnalyticsIcon />
                </button>
                <div className="tooltip-button">
                    <span>Generar reporte de asistencia</span>
                </div>
            </section>
            {/* <div className="container-generate-report">
                <div className='container-left-generate-report'>
                    <div className="icon">
                        <FileAnalyticsIcon />
                    </div>
                    <div className='title-description'>
                        <h4 className='title'>GENERAR REPORTE</h4>
                        <p className='description'>
                            Exporta los datos de asistencia para análisis o registro.
                        </p>
                    </div>
                </div>
                <div className='container-right-generate-report'></div>
            </div> */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <button className='mark-all-presents' onClick={markAllPresent}>
                    Marcar todos presentes
                </button>
                <ButtonCommon
                    icon={<SaveIcon />}
                    text={'Guardar Asistencia'}
                    onClick={handleClickSaveAttendance}
                 />
            </div>
            
            {listStudents === null ? (
                <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b' }}>
                    <p>Cargando asistencia...</p>
                </div>
            ) : (
                <BuildTable 
                    columns={columnsTableAttendance}
                    data={listStudents}
                />
            )}
        </section>
    )
}