import { createContext, useState } from "react";
import {useRequestDB} from "../hooks/utils/useRequestDB";
export const UserLoginContext = createContext()
export function UserLoginProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const { requestDB } = useRequestDB()
  useEffect(() => {
    const checkSession = async () => {
        const responseDB = await requestDB('auth/checkSession','GET',null)
        if(!responseDB) {
            setFirstTime(true)
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(true)
          setFirstTime(false)
        }
     

    }
    checkSession()
 },[])
  return (
    <UserLoginContext.Provider 
    value={{ 
        userLogin, 
        setUserLogin,
        isAuthenticated,
        firstTime,
        }}>
      {children}
    </UserLoginContext.Provider>
  )
}