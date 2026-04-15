import { HeaderClass } from "../../components/common/classes/HeaderClass.jsx"
import { useClassDetailsDocent } from "../../hooks/docent/useClassDetailsDocent.js"
export function StudentsList() {
    const { infoClass } = useClassDetailsDocent()
    if (infoClass.infoClass === null) return null

    console.log(infoClass)
    return (
        <section className="container-students-list-docent">
            <HeaderClass infoClass={infoClass.infoClass[0]} />
        </section>
    )
}