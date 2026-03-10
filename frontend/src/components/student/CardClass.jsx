import '../../styles/student/CardClass.css'
import * as Backgrounds from '../../components/common/BackgroundsClasses.jsx'
import { UserIcon } from '../common/GeneralIcons';
import { getIconUrl } from '../../utils/getIconUrl.js';
import { useNavigate } from 'react-router-dom';

export function CardClass({ classItem }) {
    const { iconName, backgroundName } = classItem.ascvis_config
    const BackgroundComponent = Backgrounds['Background' + backgroundName]
    const navigate = useNavigate()

    const handleClickNavigateClass = (asgcod) => {
        navigate(`/student/cursos/${asgcod}`, { replace: true })
    }

    return (
        <li key={classItem.asgid} className="class-card">
        <header className="header-class">
            <div className="background-wrapper">
            {BackgroundComponent && <BackgroundComponent />}
            </div>
            <div className="classroom">Salón: {classItem.cesnum}</div>
            <div className="quantity-students">
            <div>
                {classItem.quantity_students}
                <UserIcon />
            </div>
            </div>
        </header>
        <section className="icon-class">
            <img src={getIconUrl(iconName)} alt="Icono de clase" />
        </section>
        <section className="content-class">
            <h4>{classItem.asgnom}</h4>
            <p>Prof. {classItem.usunom}</p>
            <button onClick={() => handleClickNavigateClass(classItem.asgcod)}>Ver clase</button>
        </section>
        </li>
    );
}