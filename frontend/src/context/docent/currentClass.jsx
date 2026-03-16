import { createContext, useState } from "react";

export const CurrentClassContext = createContext()

export function CurrentClassProvider({ children }) {
    const [currentClass, setCurrentClass] = useState(null)
    return (
        <CurrentClassContext.Provider value={{currentClass, setCurrentClass}}>
            {children}
        </CurrentClassContext.Provider>
    )
}
