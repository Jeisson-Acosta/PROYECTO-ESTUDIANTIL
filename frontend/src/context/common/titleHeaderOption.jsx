import { createContext, useState } from "react";

export const TitleHeaderOptionContext = createContext()

export function TitleHeaderOptionProvider({ children }) {
    const [titleHeaderOption, setTitleHeaderOption] = useState('')
    return (
        <TitleHeaderOptionContext.Provider value={{ titleHeaderOption, setTitleHeaderOption }}>
            {children}
        </TitleHeaderOptionContext.Provider>
    )
}