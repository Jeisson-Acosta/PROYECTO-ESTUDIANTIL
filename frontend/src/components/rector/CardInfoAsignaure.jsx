import '../../styles/rector/CardInfoAsignature.css'
export function CardInfoAsignature({ title, bgColorIcon, icon, valueCard, className }) {
    return (
        <div className="card-info-asignature-rector">
            <header className="header-card">
                <h5>{title}</h5>
                <div className={`icon-card ${className}`} style={{ backgroundColor: bgColorIcon }}>
                   {icon}
                </div>
            </header>
            <h2 className="value-card">{valueCard}</h2>
        </div>
    )
}