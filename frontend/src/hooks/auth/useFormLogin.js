import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRequestDB } from "../utils/useRequestDB.js";
import { UserLoginContext } from "../../context/userLogin.jsx";
import { ROLES } from "../../constants.js"
import { useTitleHeaderOption } from "../common/useTitleHeaderOption.js";

// Hook personalizado para manejar los eventos que se necesitan en el formulario de iniciar sesión.
export function useFormLogin() {
    const [userInfoLogin, setUserInfoLogin] = useState({
        usuemail: "",
        usupwd: "",
    });
    const { setUserLogin, setIsAuthenticated } = useContext(UserLoginContext);
    const { requestDB } = useRequestDB();
    const { setTitleHeaderOption } = useTitleHeaderOption();

    const navigate = useNavigate();

    // handleChange -> Cuando cambia la información en tiempo real.
    // handleClick -> Cuando hacen clic a algo.
    // handleSubmit -> Cuando envian un formulario
    const handleChangeUserInfoLogin = (event) => {
        setUserInfoLogin({
            ...userInfoLogin,
            [event.target.name]: event.target.value,
        });
    };

    // Función para llevar al usuario a el formulario de registrarse.
    const handleClickRedirectCreateAccount = () => navigate("/register");

    // Función para llevar al usuario a el formulario de olvidó su contraseña.
    const handleClickRedirectForgotPassword = () => navigate("/forgot-password");

    const handleSubmitFormLogin = async (event) => {
        event.preventDefault(); // Quitar el comportamiento por defecto de un formulario

        // Hacer validacón para que el que envie el formulario sea el boton de 'Ingresar'.

        // Validaciones para que los campos no esten vacios.
        if (userInfoLogin.usuemail === "")
            return toast.error("El correo electronico no puede estar vacío");
        if (userInfoLogin.usupwd === "")
            return toast.error("La contraseña no puede estar vacía");

        const responseDB = await requestDB("auth/login", "POST", userInfoLogin);
        if (!responseDB.ok) {
            toast.error(responseDB.message);
            return;
        }

        const userData = responseDB.data[0];
        // setUserLogin(userData);
        setUserLogin({
            userInfo: JSON.parse(userData.info_user), 
            // educativeCenterInfo: JSON.parse(userData.centro_educativo),
            educativeCenterInfo: typeof userData.centro_educativo === 'string' ? JSON.parse(userData.centro_educativo) : userData.centro_educativo,
            // currentCycleInfo: JSON.parse(userData.ciclo_actual),
            currentCycleInfo: typeof userData.ciclo_actual === 'string' ? JSON.parse(userData.ciclo_actual) : userData.ciclo_actual,
            // currentCycleInfo: JSON.parse(userData.ciclo_actual),
            ...userData
        })
        setIsAuthenticated(true);
        setTitleHeaderOption(`Dashboard ${JSON.parse(userData.info_user).rolcod === 'DOC' ? 'Docente' : JSON.parse(userData.info_user).rolcod === 'EST' ? 'Estudiante' : 'Rector'}`)
        navigate(ROLES[userData.rolcod]?.path || "/");
        // toast.success("¡Hola!");
    };

    return {
        userInfoLogin,
        handleChangeUserInfoLogin,
        handleClickRedirectCreateAccount,
        handleClickRedirectForgotPassword,
        handleSubmitFormLogin,
    };
}
