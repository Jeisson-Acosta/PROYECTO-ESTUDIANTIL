import '../../styles/docent/ModalReport.css'
import { useState, useContext } from "react"
import toast from "react-hot-toast"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { UserLoginContext } from "../../context/userLogin.jsx"
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"

import { CalendarIcon, PdfIcon } from "../common/GeneralIcons.jsx"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { PDFReportAttendance } from "./PDFReportAttendance.jsx"

export function ModalReport({ showModal, setShowModalReport }) {

    const [periodTypeReport, setPeriodTypeReport] = useState('TOD') // => (TOD) Sacar reporte del día, (LST) Sacar reporte de los últimos 7 días.
    const [formatTypeReport, setFormatTypeReport] = useState('pdf') // => (pdf) Formato PDF
    const [dataReport, setDataReport] = useState(null)

    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const { currentClass } = useCurrentClass()

    const handleClickGenerateReport = async () => {
        const responseDB = await requestDB(`docent/info-attendance-to-report/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${currentClass.asgcod}/${periodTypeReport}`)
        if (!responseDB.ok) return toast.error(responseDB.message)
        setDataReport(responseDB.data[0])
    } 

    if (!showModal) return null

    return (
        <>
            <div 
                style={{position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 998}}
                onClick={() => setShowModalReport(false)}
            ></div>
            
            <div className="modal-generate-report">
                <h3 style={{ margin: 0, fontFamily: 'fontTitlesBold', color: '#1e293b', fontSize: '18px' }}>
                    Generar Reporte
                </h3>
                
                <div className='container-options-period-report' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontFamily: 'fontSubtitles', color: '#64748b', fontWeight: 'bold' }}>PERIODO</label>
                    <button
                        className={periodTypeReport === 'TOD' ? 'selected' : ''}
                        onClick={() => setPeriodTypeReport('TOD')}
                    >
                        <CalendarIcon />
                        Hoy
                    </button>
                    <button
                        className={periodTypeReport === 'LST' ? 'selected' : ''}
                        onClick={() => setPeriodTypeReport('LST')}
                    >
                        <CalendarIcon />
                        Últimos 7 días
                    </button>
                </div>


                <div className='buttons-format-type-report' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontFamily: 'fontSubtitles', color: '#64748b', fontWeight: 'bold' }}>FORMATO</label>
                    <button
                        className={formatTypeReport === 'pdf' ? 'selected' : ''}
                        onClick={() => setFormatTypeReport('pdf')}
                    >
                        <PdfIcon /> PDF
                    </button>
                </div>
                <PDFDownloadLink 
                    document={<PDFReportAttendance data={dataReport} />} 
                    fileName="reporte-asistencia.pdf"
                    style={{width: '100%'}}
                >                          
                    <button className='button-generate-report' onClick={handleClickGenerateReport}>
                        Generar Reporte
                    </button>
                </PDFDownloadLink>
            </div>
        </>

    )
}