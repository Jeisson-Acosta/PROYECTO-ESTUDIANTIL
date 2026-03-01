import { Navigate } from "react-router-dom";
import { UserLoginContext } from "../context/userLogin.jsx";
import { useContext } from "react";

export function RoleBasedRoute({ children, allowedRoles }) {
  const { isLoading, isAuthenticated, userLogin } = useContext(UserLoginContext)

  // Mientras se verifica la sesión, no renderizamos nada para evitar redirecciones prematuras.
  if (isLoading) return null

  // Si terminó la carga y no está autenticado, redirige al login.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no tiene el rol permitido, redirige a no autorizado.
  if (!allowedRoles.includes(userLogin?.rolcod)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
