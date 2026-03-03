import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserLoginContext } from "../../context/userLogin.jsx"
const ROLE_ROUTES = {
    'EST': '/student/dashboard',
    'DOC': '/teacher/dashboard',
    'REC': '/rector/dashboard'
}

export function RoleBasedRedirect() {
   const { userLogin } = useContext(UserLoginContext)
    return <Navigate to={ROLE_ROUTES[userLogin[0]?.role] || '/login' }replace  />
}
