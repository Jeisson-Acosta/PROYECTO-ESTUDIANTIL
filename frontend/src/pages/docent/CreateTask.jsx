// ==================== STYLES ====================
import "../../styles/docent/CreateTask.css"
// ================================================

// ==================== HOOKS ====================
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"
// ================================================

// ==================== COMPONENTS ====================
import { ClipboardCheckIcon, SpeakerPhone } from "../../components/common/GeneralIcons.jsx"
// ====================================================

// ==================== UTILS ====================
import { IconBook } from "../../components/common/IconsLayout.jsx"
// ================================================

function HeaderFormCreateResource({ titleHeader, typeResource, nameClass }) {
    return (
        <section className={`header-form-create-resource ${typeResource === 'TA' ? 'task' : typeResource === 'MA' ? 'material' : 'announcement'}`}>
            <h1 className="title-header-form-create-resource">
                {titleHeader}
            </h1>
            <h4 className="name-current-class">
                Clase: {nameClass}
            </h4>
            <div className="icon-resource">
                {typeResource === 'TA' 
                    ? <ClipboardCheckIcon /> 
                    : typeResource === 'MA'
                        ? <IconBook />
                        : <SpeakerPhone />
                }
            </div>
        </section>
    )
}

export function CreateTask() {

    const { currentClass } = useCurrentClass()

    return (
        <section className="general-container-form-create-resource">
            <HeaderFormCreateResource 
                titleHeader={'Crear Nueva Tarea'}
                typeResource={'TA'}
                nameClass={currentClass.asgnom}
             />
            <section className="fields-form-create-resource">
                
            </section>
        </section>
    )
}