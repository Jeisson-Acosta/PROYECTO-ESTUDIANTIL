import { createContext, useState } from "react";
import { Loader } from "../components/common/Loader.jsx";

export const ResponseDBContext = createContext()

export function ResponseDBProvider({ children }) {
    const [responseDB, setResponseDB] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <ResponseDBContext.Provider value={{responseDB, setResponseDB, loading, setLoading, error, setError}}>
            {loading && <Loader />}
            {children}
        </ResponseDBContext.Provider>
    )
}