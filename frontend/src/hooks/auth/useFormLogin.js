import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useRequestDB } from "../utils/useRequestDB.js"

// Hook personalizado para manejar los eventos que se necesitan en el formulario de iniciar sesión.
export function useFormLogin() {
    const [userInfoLogin, setUserInfoLogin] = useState({ usuemail: '',  usupwd: '' })
    const { requestDB } = useRequestDB()

    const navigate = useNavigate()

    // handleChange -> Cuando cambia la información en tiempo real.
    // handleClick -> Cuando hacen clic a algo.
    // handleSubmit -> Cuando envian un formulario
    const handleChangeUserInfoLogin = (event) => {
        setUserInfoLogin({
            ...userInfoLogin,
            [event.target.name]: event.target.value
        })
    }

    // Función para llevar al usuario a el formulario de registrarse.
    const handleClickRedirectCreateAccount = () => navigate('/register')

    const handleSubmitFormLogin = async (event) => {
        event.preventDefault() // Quitar el comportamiento por defecto de un formulario

        // Hacer validacón para que el que envie el formulario sea el boton de 'Ingresar'.

        // Validaciones para que los campos no esten vacios.
        if (userInfoLogin.usuemail === '') return toast.error('El correo electronico no puede estar vacío')

        if (userInfoLogin.usupwd === '')  return toast.error('La contraseña no puede estar vacía')

        const responseDB = await requestDB('auth/login', 'POST', userInfoLogin)
        if (!responseDB.ok) {
            toast.error(responseDB.message)
            return
        }

        toast.success('¡Hola!')

        // Aqui es donde mandamos la información al backend para que la procese
        /* if (userInfoLogin.usuemail === 'pepito@gmail.com' && userInfoLogin.usupwd === '1234') {
            toast.success('¡Bienvenido Pepito!')
            // Aqui ya debe de ingresar a la pagina
            navigate('/student/dashboard')
        } else {
            toast.error('Algo salio mal. ¡Intentalo de nuevo!')
        } */
    }

    return { userInfoLogin, handleChangeUserInfoLogin, handleClickRedirectCreateAccount, handleSubmitFormLogin }
}