import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserLoginContext } from "../context/userLogin.jsx"


export function RoleBasedRoute({ children ,allowedRoles}) {
    const {firstTime,isAuthenticated,userLogin} = useContext(UserLoginContext)
    if(!isAuthenticated && !firstTime){
        return <Navigate to="/login" replace />
    }

    if(!allowedRoles.includes(userLogin[0]?.role)){
        return <Navigate to="/unauthorized" />
    }

    return children
}