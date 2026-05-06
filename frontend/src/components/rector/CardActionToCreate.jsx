import '../../styles/rector/CardActionToCreate.css'
import { PlusIcon } from "../common/GeneralIcons.jsx"

export function CardActionToCreate({ bgColorIcon, icon, classNameIcon, title, description, textButton, colorTextButton,  onClick }) {
    return (
        <article className="card-action-to-create">
            <div className={`icon ${classNameIcon}`} style={{backgroundColor: bgColorIcon}}>
                {icon}
            </div>
            <div className="container-info-action">
                <h3 className='title-card'>
                    {title}
                </h3>
                <p className='description-card'>
                    {description}
                </p>
                <button 
                    onClick={onClick} 
                    style={{color: colorTextButton}}
                    className={`${classNameIcon}`}
                >
                    {textButton}
                    <PlusIcon/>
                </button>
            </div>
        </article>
    )
}