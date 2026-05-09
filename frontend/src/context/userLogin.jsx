import { createContext, useEffect, useState } from "react";
import { useRequestDB } from "../hooks/utils/useRequestDB.js";
import { ROLES } from "../constants.js";
import { useNavigate } from "react-router-dom";
import { useTitleHeaderOption } from "../hooks/common/useTitleHeaderOption.js";

export const UserLoginContext = createContext();

export function UserLoginProvider({ children }) {
  // const [userLogin, setUserLogin] = useState(null);

  const [userLogin, setUserLogin] = useState({ userInfo: null, educativeCenterInfo: null, currentCycleInfo: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true mientras se verifica la sesión en el backend
  const { requestDB } = useRequestDB()
  const { setTitleHeaderOption } = useTitleHeaderOption()

  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const responseDB = await requestDB("auth/checkSession", "GET", null);
        if (!responseDB.ok) {
          setIsAuthenticated(false);
        } else {
          const rolePath = ROLES[JSON.parse(responseDB.data[0].info_user).rolcod].path;
          setIsAuthenticated(true);
          setUserLogin({
            userInfo: JSON.parse(responseDB.data[0].info_user),
            educativeCenterInfo: typeof responseDB.data[0].centro_educativo === 'string' ?  JSON.parse(responseDB.data[0].centro_educativo) : responseDB.data[0].centro_educativo,
            currentCycleInfo: typeof responseDB.data[0].ciclo_actual === 'string' ? JSON.parse(responseDB.data[0].ciclo_actual) : responseDB.data[0].ciclo_actual,
            ...responseDB.data[0]
          })
          setTitleHeaderOption(`Dashboard ${JSON.parse(responseDB.data[0].info_user).rolcod === 'DOC' ? 'Docente' : JSON.parse(responseDB.data[0].info_user).rolcod === 'EST' ? 'Estudiante' : 'Rector'}`)

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
