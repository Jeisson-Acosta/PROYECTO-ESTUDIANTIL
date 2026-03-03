import { ROLES } from "../../constants.js"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
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
    tidid: "",
    rolcod: "",
    usuborn: "",
    usurol: "",
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

    // Manejar diferentes tipos de campos
    let newValue = value;

    // Para campos que deben ser números
    if (name === "ceeid" || name === "tidid") {
      newValue = value ? parseInt(value) : "";
    }

    setUserInfoRegister(prev => ({
      ...prev,
      [name]: newValue,
    }));

    console.log(`Campo ${name}:`, value);

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

  const handleClickRedirectLogin = () => navigate("/login");

  const handleSelectrol = (userRol) => {
    setUserRol(userRol);
    setUserInfoRegister({
      ...userInfoRegister,
      rolid: Object.keys(ROLES[userRol])
    });
  };
  //envia los datos al formulario
  const handleSubmitFormRegister = async (event) => {
    event.preventDefault();

    console.log("1. Estado actual antes de enviar:", userInfoRegister);
    console.log("2. Rol actual:", userInfoRegister.rolid); // ← Verifica esto

    // Validaciones
    if (!userInfoRegister.usunom) return toast.error("El nombre no puede estar vacío");
    if (!userInfoRegister.usuemail) return toast.error("El email no puede estar vacío");
    if (!userInfoRegister.rolid) {
      console.log("¡Rol vacío! Valor:", userInfoRegister.rolid);
      return toast.error("Debes seleccionar un rol");
    }
    if (!userInfoRegister.usupwd) return toast.error("La contraseña no puede estar vacía");
    if (!userInfoRegister.usupwd_confirm) return toast.error("Debes confirmar la contraseña");

    if (userInfoRegister.usupwd !== userInfoRegister.usupwd_confirm) {
      return toast.error("Las contraseñas no coinciden");
    }

    // Crear copia de los datos para enviar
    const datosEnvio = {
      ...userInfoRegister,
      ceeid: parseInt(userInfoRegister.ceeid) || 1,
    };

    console.log("3. Datos a enviar al backend:", datosEnvio);

    try {
      const responseDB = await requestDB("auth/register", "POST", datosEnvio);
      console.log("4. Respuesta del backend:", responseDB);

      if (!responseDB || !responseDB.ok) {
        toast.error(responseDB?.message || "Error al registrar usuario");
      } else {
        toast.success("Usuario registrado exitosamente");
        navigate("/");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      toast.error("Error de conexión con el servidor");
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