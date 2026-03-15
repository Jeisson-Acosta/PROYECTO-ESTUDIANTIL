import '../../../styles/common/classes/HeaderClass.css'
import { hexToRgba } from "../../../utils/hexToRgba.js"
import { getIconUrl } from "../../../utils/getIconUrl.js"
import { UserNotFilledIcon, ClockIcon } from "../GeneralIcons.jsx"
import * as Backgrounds from '../BackgroundsClasses.jsx'

export function HeaderClass({ infoClass }) {
    const { iconName, backgroundName, color } = infoClass.ascvis_config
    const BackgroundComponent = Backgrounds['Background' + backgroundName]

    return (
        <header className="header-class">
            <div className="background-wrapper">
                {BackgroundComponent && <BackgroundComponent />}
            </div>
            <div className="icon-class-header">
                <img src={getIconUrl(iconName)} alt="Icono de clase" width="220px" height="160px" />
            </div>
            <div className="code-class" style={{backgroundColor: hexToRgba(color) }}>
                Código: {infoClass.asgcod_clase}
            </div>
            <div className="info-class">
                <h1 className='title-class'>{infoClass.asgnom}</h1>
                <div className="info-complement-class">
                    <p className='teacher-class'>
                        <UserNotFilledIcon />
                        Prof. {infoClass.usunom}
                    </p>
                    <p className='classroom-class'>
                        <ClockIcon />
                        Lun, Mie 10:00 - 11:30 AM
                    </p>
                </div>
            </div>
        </header>
    )
}