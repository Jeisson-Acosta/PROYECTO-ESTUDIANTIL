import { CurrentClassContext } from "../../context/docent/currentClass";
import { useContext } from "react";

export function useCurrentClass() {
    const context = useContext(CurrentClassContext)
    if (!context) {
        throw new Error('useCurrentClass must be used within a CurrentClassProvider')
    }
    return context
}