import { useContext } from "react"
import { TitleHeaderOptionContext } from "../../context/common/titleHeaderOption.jsx"

export function useTitleHeaderOption() {
    const context = useContext(TitleHeaderOptionContext)
    if (!context) {
        throw new Error('useTitleHeaderOption debe ser usado dentro de TitleHeaderOptionProvider')
    }
    return context
}