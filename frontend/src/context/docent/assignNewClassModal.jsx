import {Children, createContext, useState} from "react"
export const AssignNewClassModalContext = createContext()
export function AssignNewClassModalProvider({children}) {
    const [showModalAssignNewClass,setShowModalAssignNewClass] = useState(false)
    return (
        <AssignNewClassModalContext.Provider value={{showModalAssignNewClass,setShowModalAssignNewClass}}>
            {children}
        </AssignNewClassModalContext.Provider>
    )
} 
