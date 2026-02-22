import { useContext } from "react";
import { ResponseDBContext } from "../../context/reponseDB.jsx";

export const useResponseDB = () => {
    const context = useContext(ResponseDBContext)

    if (context === undefined) {
        throw new Error('useResponseDB must be used within a ResponseDBProvider')
    }

    return context
}