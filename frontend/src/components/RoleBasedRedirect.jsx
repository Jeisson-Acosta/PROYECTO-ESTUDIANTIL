import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserLoginContext } from "../context/userLogin.jsx";
import { ROLES } from "../constants.js";

// EJ: ROLE_ROUTES["EST"] -> Retorna la url de ese rol.

export function RoleBasedRedirect() {
  const { userLogin } = useContext(UserLoginContext);

  if (!userLogin) return <Navigate to="/login" replace />;

  // || -> OR
  return <Navigate to={ROLES[userLogin[0]?.rolcod].path || "/login"} replace />;
}
