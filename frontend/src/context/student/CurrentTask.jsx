import { createContext, useState } from "react";

export const CurrentTaskContext = createContext()

export function CurrentTaskProvider({ children }) {
    const [currentTask, setCurrentTask] = useState(null)
    return (
        <CurrentTaskContext.Provider value={{ currentTask, setCurrentTask }}>
            {children}
        </CurrentTaskContext.Provider>
    )
}