// ==================== STYLES ====================
import "../../styles/docent/CreateTask.css"
// ================================================

// ==================== HOOKS ====================
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"
// ================================================

// ==================== COMPONENTS ====================
import { HeaderFormCreateResource } from "../../components/docent/HeaderFormCreateResource.jsx"
import { FormFieldsCreateResource } from "../../components/docent/FormFieldsCreateResource.jsx"
// ====================================================

// ==================== UTILS ====================
// ================================================

export function CreateTask() {

    const { currentClass } = useCurrentClass()

    return (
        <section className="general-container-form-create-resource">
            <HeaderFormCreateResource 
                titleHeader={'Crear Nueva Tarea'}
                typeResource={'TA'}
                nameClass={currentClass.asgnom}
             />
            <FormFieldsCreateResource
                typeResource={'TA'}
             />
        </section>
    )
}