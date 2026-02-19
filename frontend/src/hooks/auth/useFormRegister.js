import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { registerUser } from '../../components/auth/authService.js';


export function useFormRegister () {
      const [userInfoRegister, setUserInfoRegister] = useState({
  usunom: "",
  usuemail: "",
  tidid: "",
  usudocu: "",
  usucel:"",
  usuborn: "",
  usurol: "",
  usupwd: "",
  usupwd_confirm:""
});

       const navigate = useNavigate()

      const [userRol, setUserRol] = useState("");
      const [passwordStatus,setPasswordStatus] = useState({
        length: false,
        upperCase: false,
        special:false
      });
  
      const handleChangeUserInfoRegister = (event) => {
  const { name, value } = event.target;

  setUserInfoRegister({
    ...userInfoRegister,
    [name]: value
  });

  if (name === "usupwd") {
    validatePassword(value);
  }
};     


  //Validar parametros de la contraseña
       const validatePassword = (usupwd) => {
        setPasswordStatus({
            length: usupwd.length >= 8,
            upperCase: /[A-Z]/.test(usupwd),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(usupwd)
        })
       }

    const handleClickRedirectLogin = () => navigate ('/')

    const  handleSelectrol = (userRol) => {
        setUserRol (userRol);
       setUserInfoRegister ({
        ...userInfoRegister
       })
    }
    const handleSubmitFormRegister = async (event) => {
       event.preventDefault() 
       console.log("CLICK EN REGISTRARSE");
       //validacion para campos vacios
       if (userInfoRegister.usunom === '') return toast.error ('este campo no puede estar vacio')
       if (userInfoRegister.usuemail === '') return toast.error ('este campo no puede estar vacio')
       //if (userInfoRegister.tidid === '') return toast.error ('este campo no puede estar vacio')
       if (userInfoRegister.usudocu === '') return toast.error ('este campo no puede estar vacio')
       if (userInfoRegister.usucel === '') return toast.error ('este campo no puede estar vacio')
       if (userInfoRegister.usuborn === '') return toast.error ('este campo no puede estar vacio')
       if (userInfoRegister.usupwd === '') return toast.error ('este campo no puede estar vacio')
       if (userInfoRegister.usupwd_confirm === '') return toast.error ('este campo no puede estar vacio')
        //validar si las contraseñas coinciden 
    /*if (userInfoRegister.usupwd === userInfoRegister.usupwd_confirm) {
        toast.success ('¡Ya puedes iniciar sesion')

    }else {
        return toast.error ('las contraseñas no coinciden')
    }*/
    const res =await registerUser({userInfoRegister});
  if (res.ok) {
    toast.success(res.message || 'Usuario Registrado completamente');
  }else {
    toast.success (res.message) || 'Error al registrar';
  }
    }
    return {userInfoRegister,userRol,passwordStatus,handleSubmitFormRegister,handleChangeUserInfoRegister,handleClickRedirectLogin,handleSelectrol,setPasswordStatus,validatePassword}
   
}

