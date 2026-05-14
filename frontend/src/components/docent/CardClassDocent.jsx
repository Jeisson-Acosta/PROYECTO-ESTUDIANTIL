import * as Backgrounds from '../common/BackgroundsClasses.jsx'
import { getIconUrl } from '../../utils/getIconUrl.js'
import { ArrowRightIcon, BookIcon, UserIcon } from '../common/GeneralIcons.jsx'
import { useNavigate } from 'react-router-dom'

export function CardClassDocent({ classDocent }) {
    const { iconName, backgroundName } = classDocent.ascvis_config
    const BackgroundComponent = Backgrounds['Background' + backgroundName]
    const navigate = useNavigate()

    const handleClickViewClass = (asgcod) => { navigate(`/docent/cursos/${asgcod}`) }

    return (
        <li className="class-card">
            <header className="header-class-card">
                <div className="background-wrapper">
                    {BackgroundComponent && <BackgroundComponent />}
                </div>
                <div className="classroom">Salón: {classDocent.cesnum}</div>
                <div className="quantity-students">
                    <div>
                        {classDocent.quantity_students}
                        <UserIcon />
                    </div>
                </div>
            </header>
            <section className="icon-class">
                <img src={getIconUrl(iconName.toLowerCase())} alt="Icono de clase" />
            </section>
            <section className="content-class">
                <h4>{classDocent.asgnom}</h4>
                {classDocent.quantity_new_deliveries_x_class && (
                    <div className='quantity-new-deliveries-x-class'>
                        <BookIcon />
                        <span>
                            {classDocent.quantity_new_deliveries_x_class}
                            {' '}
                            {classDocent.quantity_new_deliveries_x_class === 1 ? 'entrega' : 'entregas'}
                        </span>
                    </div>
                )}
                <button style={{ marginTop: '12px' }} onClick={() => handleClickViewClass(classDocent.asgcod)}>
                    Ver clase
                    <ArrowRightIcon />
                </button>
            </section>
        </li>
    )

}