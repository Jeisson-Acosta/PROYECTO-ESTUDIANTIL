import { useContext } from "react"
import { ShowWelcomeModalAppContext } from "../../context/common/showWelcomeModalApp.jsx"

export function useShowWelcomeModalApp() {
    const context = useContext(ShowWelcomeModalAppContext)
    if (!context) {
        throw new Error('useShowWelcomeModalApp debe ser usado dentro de ShowWelcomeModalAppProvider')
    }
    return context
}