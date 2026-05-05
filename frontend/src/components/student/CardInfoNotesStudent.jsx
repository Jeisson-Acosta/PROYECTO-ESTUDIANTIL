import '../../styles/student/CardInfoNotesStudent.css'
export function CardInfoNotesStudent({ title, value, bgColorIcon, icon, classNameIcon = '' }) {
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