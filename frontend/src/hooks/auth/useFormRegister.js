import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
//Importa register user de authService para enviar los datos del formulario
import { useRequestDB } from "../utils/useRequestDB.js";

export function useFormRegister() {
  const { requestDB } = useRequestDB()
  const [userInfoRegister, setUserInfoRegister] = useState({
    usunom: "",
    usuemail: "",
    usupwd: "",
    usudocu: "",
    usucel: "",
    usufch_nacimiento: "",
    ceeid: 1,
    tidid: null,
    rolid: null,
    usuborn: "",
    usurol: null,
    usupwd_confirm: "",
  })

  const [userRol, setUserRol] = useState("")
  const [passwordStatus, setPasswordStatus] = useState({
    length: false,
    upperCase: false,
    special: false,
  })

  const navigate = useNavigate()

  const handleChangeUserInfoRegister = (event) => {
    const { name, value } = event.target;

    setUserInfoRegister({
      ...userInfoRegister,
      [name]: name.includes("id") ? parseInt(value) : value,
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
    };
    setUserRol(userRol);
    setUserInfoRegister({
      ...userInfoRegister,
      rolid: ROLES[userRol],
    });
  };
  //envia los datos al formulario
  const handleSubmitFormRegister = async (event) => {
    event.preventDefault();
    //validacion para campos vacios
    /* if (userInfoRegister.usunom === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usuemail === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.tidid === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usudocu === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usucel === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usuborn === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usupwd === "")
      return toast.error("este campo no puede estar vacio");
    if (userInfoRegister.usupwd_confirm === "")
      return toast.error("este campo no puede estar vacio"); */
    //validar si las contraseñas coinciden
    if (userInfoRegister.usupwd === userInfoRegister.usupwd_confirm) {
      const responseDB = await requestDB("auth/register", "POST", userInfoRegister)
      if (!responseDB || !responseDB.ok) {
        toast.error("Error al registrar usuario");
      } else {
        toast.success("Usuario registrado exitosamente");
        navigate("/");
      }
    } else {
      return toast.error("las contraseñas no coinciden");
    }

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
