// ==================== STYLES ====================
import "../../styles/docent/HeaderFormCreateResource.css"
// ================================================

// ==================== COMPONENTS ====================
import { BookIcon, ClipboardCheckIcon, SpeakerPhone } from "../common/GeneralIcons.jsx"
// ====================================================

export function HeaderFormCreateResource({ titleHeader, typeResource, nameClass }) {
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
                        ? <BookIcon />
                        : <SpeakerPhone />
                }
            </div>
        </section>
    )
}