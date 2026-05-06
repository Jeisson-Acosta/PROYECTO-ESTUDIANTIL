import { createContext, useState } from "react";

export const ShowWelcomeModalAppContext = createContext()

export function ShowWelcomeModalAppProvider({ children }) {
    const [showWelcomeModalApp, setShowWelcomeModalApp] = useState(false)

    const showModal = (rolnom) => {
        return alert('mostrar modal de bienvenida' + rolnom)
    }

    return (
        <ShowWelcomeModalAppContext.Provider value={{ showWelcomeModalApp, setShowWelcomeModalApp, showModal }}>
            {children}
        </ShowWelcomeModalAppContext.Provider>
    )
}