import '../../styles/docent/CardAttendance.css'
export function CardAttendance({ title, value, colorNumber, bgColorCircle }) {
    return (
        <div className="card-attendance">
            <h4 className='title-card-attendance'>{title}</h4>
            <span style={{color: colorNumber, fontFamily: 'fontTitlesBold', fontSize: '24px'}}>
                {value}
            </span>
            <div style={{
                backgroundColor: bgColorCircle,
                position: 'absolute',
                width: '100px',
                height: '100px',
                top: -40,
                right: -50,
                borderRadius: '50%'
            }}></div>
        </div>
    )
}