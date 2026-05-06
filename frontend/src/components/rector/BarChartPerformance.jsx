import { useState } from 'react'
import '../../styles/rector/BarChartPerformance.css'

export function BarChartPerformance({ generalAverage, performanceData }) {
    const [activeTab, setActiveTab] = useState('grados')

    const courses = typeof performanceData === 'string'
        ? JSON.parse(performanceData)
        : (performanceData ?? [])

    return (
        <div className="bar-chart-card">

            <div className="bar-chart-top-row">
                <div className="bar-chart-header">
                    <p className="bar-chart-title">Promedio General</p>
                    <h2 className="bar-chart-value">
                        {generalAverage}<span>/100</span>
                    </h2>
                </div>
                <div className="bar-chart-tabs">
                    <button
                        className={`bar-chart-tab ${activeTab === 'grados' ? 'active' : ''}`}
                        onClick={() => setActiveTab('grados')}
                    >
                        Grados
                    </button>
                    <button
                        className={`bar-chart-tab ${activeTab === 'materias' ? 'active' : ''}`}
                        onClick={() => setActiveTab('materias')}
                    >
                        Materias
                    </button>
                </div>
            </div>

            <div className="bar-chart-graph">
                {courses.map((course) => (
                    <div key={course.edcid} className="bar-col">
                        <div className="bar-track-vertical">
                            <div
                                className="bar-fill-vertical"
                                style={{ height: `${course.promedio}%` }}
                            />
                        </div>
                        <span className="bar-col-label">{course.edcnom}</span>
                    </div>
                ))}
            </div>

        </div>
    )
}
