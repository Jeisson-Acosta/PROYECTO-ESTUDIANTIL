import nutriaPrincipal from "../../assets/nutria_principal.png";
import "../../styles/auth/Register.css";
import "../../hooks/auth/useFormRegister.js";
import { IconTeacher, IconBook, IconRector } from "../common/IconsLayout";
import { useFormRegister } from "../../hooks/auth/useFormRegister.js";
import { useRequestDB } from "../../hooks/utils/useRequestDB.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Register() {
  const [educativeCenters, setEducativeCenters] = useState(null)
  const { requestDB } = useRequestDB()
  const {
    userInfoRegister,
    userRol,
    passwordStatus,
    handleChangeUserInfoRegister,
    handleSelectrol,
    handleClickRedirectLogin,
    handleSubmitFormRegister,
    validatePassword,
  } = useFormRegister();

  useEffect(() => {
    const getEducativeCenters = async () => {
      const responseDB = await requestDB("auth/educative-centers", "GET")
      if (!responseDB.ok) {
        toast.error("Error al obtener los centros educativos, " + responseDB.message);
      }
      setEducativeCenters(responseDB.data)
    }
    getEducativeCenters()
  }, [])

  return (
    <div className="container-all-register">
      <div className="container-principal-register">
        <div className="container-info-register">
          <div className="image-register">
            <img src={nutriaPrincipal} width="100px" height="150px" />
          </div>
          <div className="title-register">
            <h2>Unete a nuestra comunidad</h2>
            <p>
              Empieza su viaje educativo en un entorno de calma y aprendizaje
              colaborativo
            </p>
          </div>
        </div>
        <form
          className="form-register"
          onSubmit={(e) => handleSubmitFormRegister(e)}
        >
          <header>
            <h2>Crea una cuenta</h2>
            <p>Introduce tus datos personales</p>
          </header>
          <div className="fields-form-register">
            <div className="fields-form">
              <label>
                Nombre completo
                <input
                  type="text"
                  placeholder="Pepito perez"
                  name="usunom"
                  value={userInfoRegister.usunom}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>
              <label>
                Correo electronico
                <input
                  type="email"
                  name="usuemail"
                  placeholder="ejemplo@dominio.com"
                  value={userInfoRegister.usuemail}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>

              <label>
                Tipo de documento
                <select
                  name="tidid"
                  value={userInfoRegister.tidid}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                >
                  <option value=''>Seleccione su tipo de documento</option>
                  <option value={2}>Tarjeta de Identidad</option>
                  <option value={1}>Cedula de Ciudadania</option>
                  <option value={3}>Cedula de extranjeria</option>
                  <option value={4}>Nit</option>
                  <option value={5}>Pasaporte</option>
                </select>
              </label>

              <label>
                Numero de documento
                <input
                  type="text"
                  name="usudocu"
                  value={userInfoRegister.usudocu}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>
              <label>
                Numero de celular
                <input
                  type="text"
                  name="usucel"
                  value={userInfoRegister.usucel}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>
              <label>
                Fecha de nacimiento
                <input
                  type="date"
                  name="usufch_nacimiento"
                  value={userInfoRegister.usufch_nacimiento}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>
              <label>
                Centro educativo
                <select
                  name="cedid"
                  value={userInfoRegister.cedid}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                >
                  <option value=''>Seleccione su centro educativo</option>
                  {educativeCenters?.map((center) => (
                    <option key={center.cedid} value={center.cedid}>
                      {center.cednom}
                    </option>
                  ))}
                </select>
              </label>
              {/* 
              <label className="full">
                Centro educativo
                <input
                  type="text"
                  name="cedid"
                  value={userInfoRegister.cedid}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label> */}
              <div className="roles-block">
                <label className="roles-label">Selecciona tu rol:</label>

                <div className="roles-container">
                  <button
                    type="button"
                    className={`boton-register ${
                      userRol === "EST" ? "active" : ""
                    }`}
                    name="rolcod"
                    onClick={() => handleSelectrol("EST")}
                  >
                    {" "}
                    <div className="image-button">
                      <IconBook />
                    </div>
                    <span>Estudiante</span>
                  </button>
                  <button
                    type="button"
                    className={`boton-register ${
                      userRol === "DOC" ? "active" : ""
                    }`}
                    name="rolcod"
                    onClick={() => handleSelectrol("DOC")}
                  >
                    {" "}
                    <div className="image-button">
                      <IconTeacher />
                    </div>
                    <span>Docente</span>
                  </button>
                  <button
                    type="button"
                    className={`boton-register ${
                      userRol === "REC" ? "active" : ""
                    }`}
                    name="rolcod"
                    onClick={() => handleSelectrol("REC")}
                  >
                    {" "}
                    <div className="image-button">
                      <IconRector />
                    </div>
                    <span>Rector</span>
                  </button>
                </div>
              </div>

              <label>
                Contraseña
                <input
                  type="password"
                  name="usupwd"
                  value={userInfoRegister.usupwd}
                  onChange={(e) => {
                    handleChangeUserInfoRegister(e);
                    validatePassword(e.target.value);
                  }}
                />
              </label>
              <label>
                Confirmar Contraseña
                <input
                  type="password"
                  name="usupwd_confirm"
                  value={userInfoRegister.usupwd_confirm}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>

              <div className="password-rules">
                <ul>
                  <li className={passwordStatus.length ? "ok" : "error"}>
                    Minimo 8 Caracters
                  </li>
                  <li className={passwordStatus.upperCase ? "ok" : "error"}>
                    Una Mayuscula
                  </li>
                  <li className={passwordStatus.special ? "ok" : "error"}>
                    Un Caracter especial (!@#$%^&*(),.?":{}|<></>)
                  </li>
                </ul>
              </div>
            </div>
            <footer>
              <div className="final-part-form-register">
                <button className="btn-register-form" type="submit">
                  Registrarse
                </button>
                <button
                  type="button"
                  className="btn-login-account"
                  onClick={handleClickRedirectLogin}
                >
                  ¿Ya tienes una cuenta? <span>Inicia sesion aqui</span>
                </button>
              </div>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}
