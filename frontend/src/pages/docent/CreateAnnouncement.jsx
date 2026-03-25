// ==================== STYLES ====================
// import "../../styles/docent/CreateTask.css"
// ================================================

// ==================== COMPONENTS ====================
import { HeaderFormCreateResource } from "../../components/docent/HeaderFormCreateResource.jsx"
import { FormFieldsCreateResource } from "../../components/docent/FormFieldsCreateResource.jsx"
// ====================================================

// ==================== HOOKS ====================
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"
// ================================================

export function CreateAnnouncement() {

    const { currentClass } = useCurrentClass()

    return (
        <section className="general-container-form-create-resource">
            <HeaderFormCreateResource 
                titleHeader={'Crear Nuevo Anuncio'}
                typeResource={'EN'}
                nameClass={currentClass.asgnom}
             />
            <FormFieldsCreateResource
                typeResource={'EN'}
             />
        </section>
    )
}