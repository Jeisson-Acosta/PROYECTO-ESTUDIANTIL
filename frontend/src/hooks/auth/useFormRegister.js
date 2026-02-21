import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
//Importa register user de authService para enviar los datos del formulario
import { registerUser } from "../../components/auth/authService";

export function useFormRegister() {
  const [userInfoRegister, setUserInfoRegister] = useState({
    usunom: "",
    usuemail: "",
    tidid: "",
    usudocu: "",
    usucel: "",
    usuborn: "",
    usurol: "",
    usupwd: "",
    usupwd_confirm: "",
  });

  const navigate = useNavigate();

  const [userRol, setUserRol] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({
    length: false,
    upperCase: false,
    special: false,
  });

  const handleChangeUserInfoRegister = (event) => {
    const { name, value } = event.target;

    setUserInfoRegister({
      ...userInfoRegister,
      [name]: value,
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
      special: /[!@#$%^&*(),.?":{}|<>]/.test(usupwd),
    });
  };

  const handleClickRedirectLogin = () => navigate("/");

  const handleSelectrol = (userRol) => {
       const ROLES = {
  estudiante: 1,
  docente: 2,
  rector: 3,
}
    setUserRol(userRol);
    setUserInfoRegister({
      ...userInfoRegister,
       usurol: ROLES[userRol],
    });
  };
  //envia los datos al formulario
  const handleSubmitFormRegister = async (event) => {
    event.preventDefault();
    //validacion para campos vacios
    if (userInfoRegister.usunom === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usuemail === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.tidid === '') return toast.error ('este campo no puede estar vacio')
    if (userInfoRegister.usudocu === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usucel === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usuborn === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usupwd === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usupwd_confirm === "")
      return toast.error("este campo no puede estar vacio");
    //validar si las contraseñas coinciden
    if (userInfoRegister.usupwd === userInfoRegister.usupwd_confirm) {
      toast.success("¡Ya puedes iniciar sesion");
    } else {
      return toast.error("las contraseñas no coinciden");
    }

      //recibe los datos del formulario //
   const data ={
      usunom: userInfoRegister.usunom,
  usuemail: userInfoRegister.usuemail,
  usupwd: userInfoRegister.usupwd,
  usudocu: userInfoRegister.usudocu,
  usucel: userInfoRegister.usucel,
  rolid: Number(userInfoRegister.usurol),
  tidid: Number(userInfoRegister.tidid),
   }
    //espera que el backend responda
    const res = await registerUser(data);



  };
  return {
    userInfoRegister,
    userRol,
    passwordStatus,
    handleSubmitFormRegister,
    handleChangeUserInfoRegister,
    handleClickRedirectLogin,
    handleSelectrol,
    setPasswordStatus,
    validatePassword,
  };
}
