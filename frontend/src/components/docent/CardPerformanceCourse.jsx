import '../../styles/docent/CardPerformanceCourse.css'

export function CardPerformanceCourse({icon, smalTitle, value, bgColorIcon, bgColorCard}) {
    return (
        <div className="card-performance" style={{backgroundColor: bgColorCard}}>
            <div className="icon-performance" style={{backgroundColor: bgColorIcon}}>
                {icon}
            </div>
            <div className="info-performance">
                <h5 className='small-title-performance'>
                    {smalTitle}
                </h5>
                <h3 className='value-card-performance'>
                    {value}
                </h3>
            </div>
        </div>
    )
}