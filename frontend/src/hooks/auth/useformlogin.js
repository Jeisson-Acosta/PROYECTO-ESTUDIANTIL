import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
export function useFormLogin(){
        const [userInfoLogin, setUserInfoLogin] = useState({ 
        usuemail: '', 
        usupwd: '' 
    })

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
   const handleClickRedirectCreateAccount = () => {navigate('/register')}
    const handleSubmitFormLogin = (event) => {
        event.preventDefault() // Quitar el comportamiento por defecto de un formulario

        // Hacer validacón para que el que envie el fomrulario sea el boton de 'Ingresar'.

        // Validaciones para que los campos no esten vacios.
        if (userInfoLogin.usuemail === '') 
            return toast.error('El correo electronico no puede estar vacío')

        if (userInfoLogin.usupwd === '') 
            return toast.error('La contraseña no puede estar vacía')

        // Aqui es donde mandamos la información al backend para que la procese
        if (
            userInfoLogin.usuemail === 'pepito@gmail.com' && 
            userInfoLogin.usupwd === '1234'
        ) {
            toast.success('¡Bienvenido Pepito!')
            // Aqui ya debe de ingresar a la pagina
            navigate('/student/dashboard')
        } else {
            toast.error('Algo salio mal. ¡Intentalo de nuevo!')
        }
    }

  return {userInfoLogin, handleChangeUserInfoLogin, handleSubmitFormLogin, handleClickRedirectCreateAccount}
}