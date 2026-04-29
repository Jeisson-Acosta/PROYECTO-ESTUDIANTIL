import '../../styles/docent/CardInfoTeacherDashboard.css'
export function CardInfoDashboardTeacher({ bgColor, title, principalIcon, principalValue, secondIcon, secondValue, colorTitle, colorPrincipalValue }) {
    return (
        <div className="card-info-dashboard-teacher" style={{backgroundColor: bgColor}}>
            <div className='title-icon'>
                <h4 
                    className='title-card' 
                    style={{color: colorTitle, fontWeight: 'bold'}}
                >
                    {title}
                </h4>
                <div className="icon">
                    {principalIcon}
                </div>
            </div>
            <div className='principal-value-card'>
                <h3 style={{color: colorPrincipalValue}}>{principalValue}</h3>
            </div>
            <div className='second-value-card'>
                {secondIcon}
                <span>{secondValue}</span>
            </div>
        </div>
    )
}