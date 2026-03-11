import '../../styles/student/UpcomingDelivery.css'
import { getIconUrl } from "../../utils/getIconUrl.js"
import { hexToRgba } from "../../utils/hexToRgba.js"

import { CalendarIcon, AlarmIcon, EllipsisIcon } from '../common/GeneralIcons.jsx'

export function UpcomingDelivery({ delivery }) {
    return (
        <li className="delivery-card">
            <div className="info-delivery">
                <div className="icon-class" style={{ backgroundColor: hexToRgba(delivery.ascvis_config.color, 0.4) }}>
                    <img src={getIconUrl(delivery.ascvis_config.iconName)} alt="Icono de clase" />
                </div>
                <div className="content-class-delivery">
                    <h3 className="title-class" style={{ color: '#' + delivery.ascvis_config.color }}>{delivery.asgnom}</h3>
                    <h4 className="title-task">{delivery.astnomtrabajo}</h4>
                    <div className="info-overdue-delivery">
                        <CalendarIcon />
                        <span className="date-overdue">{delivery.astfecfin}</span>
                        <AlarmIcon />
                        <span>Faltan 2 horas</span>
                    </div>
                </div>
            </div>
            <div className="actions-delivery">
                <div className="status-delivery">
                    Pendiente
                </div>
                <button>
                    <EllipsisIcon />
                </button>
            </div>
        </li>
    )
}