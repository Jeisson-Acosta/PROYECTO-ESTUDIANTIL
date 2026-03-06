import { createContext, useEffect, useState } from "react";
import { useRequestDB } from "../hooks/utils/useRequestDB.js";
import { ROLES } from "../constants.js";
import { useNavigate } from "react-router-dom";

export const UserLoginContext = createContext();

export function UserLoginProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true mientras se verifica la sesión en el backend
  const { requestDB } = useRequestDB();

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const responseDB = await requestDB("auth/checkSession", "GET", null);
        console.log(responseDB);
        if (!responseDB) {
          setIsAuthenticated(false);
        } else {
          const rolePath = ROLES[responseDB.rolcod].path;
          setIsAuthenticated(true);
          setUserLogin(responseDB);
          navigate(rolePath, { replace: true });
        }
      } finally {
        setIsLoading(false); // La carga termina sin importar el resultado
      }
    };
    checkSession();
  }, []);

  return (
    <UserLoginContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        userLogin,
        setUserLogin,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
}
