import '../../styles/student/ReportsStudent.css'
import { useTitleHeaderOption } from "../../hooks/common/useTitleHeaderOption.js"
import { useEffect, useContext, useState } from "react"

import { UserLoginContext } from "../../context/userLogin.jsx"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import toast from "react-hot-toast";
import { ButtonCommon } from "../../components/common/ButtonCommon.jsx";
import { ClipboardTypographyIcon, DownloadIcon, EyeIcon, RocketIcon, SendIcon, TrendUpIcon } from "../../components/common/GeneralIcons.jsx";
import { CircleChart } from "../../components/common/charts/CircleChart.jsx";

export function ReportsStudent() {
    const { setTitleHeaderOption } = useTitleHeaderOption();
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const [infoToReports, setInfoToReports] = useState(null)
    const [cecidSelected, setCecidSelected] = useState(userLogin.currentCycleInfo.cecid)

    useEffect(() => {
        const getInfoToReports = async () => {
    
            const result = await requestDB(`student/info-reports/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${cecidSelected}`, 'GET')
            if (!result.ok) return toast.error(result.message)
            result.data[0].cycles = result.data[0].cycles !== null ? typeof result.data[0].cycles === 'string' ? JSON.parse(result.data[0].cycles) : result.data[0].cycles : []
            result.data[0].average_by_asignaures = result.data[0].average_by_asignaures !== null ? typeof result.data[0].average_by_asignaures === 'string' ? JSON.parse(result.data[0].average_by_asignaures) : result.data[0].average_by_asignaures : []
            setInfoToReports(result.data[0])
        }
        getInfoToReports()
        setTitleHeaderOption('Reportes')
    }, [cecidSelected])

    if (infoToReports === null) return

    return (
        <section className="principal-container-reports-student">
            <header className="header-reports-student">
                <div className="container-select-period">
                    <label htmlFor="cecid">Selecciona un periodo:</label>
                    <select 
                        name="cecid" 
                        id="cecid"
                        value={cecidSelected}
                        onChange={(e) => setCecidSelected(e.target.value)}
                    >
                        {infoToReports.cycles.map((cycle) => (
                            <option key={cycle.cecid} value={cycle.cecid}>
                                {cycle.cecnom}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <ButtonCommon 
                        text={'Ver boletin'}
                        icon={<EyeIcon />}
                    />
                    <ButtonCommon 
                        text={'Descargar boletin'}
                        icon={<DownloadIcon />}
                    />
                    <ButtonCommon 
                        text={'Enviar boletin'}
                        icon={<SendIcon />}
                    />
                </div>
            </header>
            <aside className="cards-info-reports-student">
                <div className="card-report-student general-average">
                    <header className="header-card-general-average">
                        <div>
                            <h4>Promedio General</h4>
                            <span>
                                {infoToReports.general_average}
                                {' '}
                                <span style={{color: '#b7bcc5', fontSize: '20px'}}>
                                    / 5.0
                                </span>
                            </span>
                        </div>
                        <div className="icon-general-average">
                            <TrendUpIcon />
                        </div>
                    </header>
                    <div className="message-general-average">
                        <div className={`message ${infoToReports.general_average >= 4.0 ? 'superior' : infoToReports.general_average >= 3.0 ? 'medio' : 'inferior'}`}>
                            <RocketIcon />
                            {infoToReports.general_average >= 4.0 && <p>¡Sigue asi y podras mejorarlo!</p>}
                            {infoToReports.general_average >= 3.0 && infoToReports.general_average < 4.0 && <p>¡Vamos por buen camino!</p>}
                            {infoToReports.general_average < 3.0 && <p>¡Ponle mas esfuerzo y podras mejorarlo!</p>}
                        </div>
                        <div 
                            className="progress-bar"
                            style={{
                                width: `${infoToReports.general_average / 5 * 100}%`,
                                backgroundColor: infoToReports.general_average >= 4.0 ? '#0d9488' : infoToReports.general_average >= 3.0 ? '#f59e0b' : '#f16363'
                            }}
                        ></div>
                    </div>
                </div>
                <div className="card-report-student attendance">
                    <h4>Asistencia</h4>
                    <div className="circle-chart-container-attendance">
                        <div className="info-general-attendance-student">
                            <div>
                                <h5 style={{color: '#666e7a'}}>Total Clases</h5>
                                <span>{infoToReports.total_classes}</span>
                            </div>
                            <div>
                                <h5 style={{color: '#f38080'}}>Inasistencias</h5>
                                <span style={{color: '#df3636', backgroundColor: '#fee2e2', padding: '4px 10px', borderRadius: '12px'}}>
                                    {infoToReports.total_absences}
                                </span>
                            </div>
                        </div>
                        <CircleChart 
                            endValue={100}
                            value={Number(infoToReports.general_attendance_average)}
                            color={'f59e0b'}
                            additionalText="%"
                            colorBlank="e5e7eb"
                        />
                    </div>
                </div>
                <div className="card-report-student tasks-info-student-report">
                    <header>
                        <div>
                            <h4>Tareas</h4>
                            <span className="value-total-tasks">
                                {infoToReports.total_tasks} {' '}
                                <span style={{color: '#afb5bf'}}>Totales</span>
                            </span>
                        </div>
                        <div className="icon-total-tasks">
                            <ClipboardTypographyIcon />
                        </div>
                    </header>
                    <div className="content-total-tasks">
                        <div className="tasks-stats">
                            <div className="stat-item">
                                <div className="stat-item-left">
                                    <div className="small-circle green"></div>
                                    <h5>Entregadas</h5>
                                </div>
                                <span>{infoToReports.total_deliveries_tasks}</span>
                            </div>
                            <div className="stat-item">
                                <div className="stat-item-left">
                                    <div className="small-circle red"></div>
                                    <h5>Sin entregar</h5>
                                </div>
                                <span>{infoToReports.total_without_deliverie_tasks}</span>
                            </div>
                        </div>
                        <button className="btn-view-details-tasks">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </aside>

            <section className="container-bottom-reports-student">
                <div className="card-report-student subjects-average-chart">
                    <header>
                        <h4>Notas por materia</h4>
                    </header>
                    
                    {infoToReports.average_by_asignaures.length === 0 ? (
                        <div className="empty-state-subjects">
                            <p>Aún no tienes notas registradas en este periodo.</p>
                        </div>
                    ) : (
                        <div className="chart-subjects-container">
                            {infoToReports.average_by_asignaures.map((subj) => (
                                <div key={subj.asgid} className="subject-bar-item">
                                    <div className="bar-wrapper">
                                        <div 
                                            className="bar-fill" 
                                            style={{ 
                                                height: `${(subj.average / 5) * 100}%`,
                                                backgroundColor: `#${subj.ascvis_config?.color || '3b82f6'}`
                                            }}
                                        >
                                            <div className="tooltip-average">
                                                {subj.average}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="subject-name-abbr" title={subj.asgnom}>
                                        {subj.asgnom}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
}