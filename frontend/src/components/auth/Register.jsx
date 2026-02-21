import nutriaPrincipal from "../../assets/nutria_principal.png";
import "../../styles/auth/Register.css";
import "../../hooks/auth/useFormRegister.js";
import { IconTeacher, IconBook, IconRector } from "../common/IconsLayout";
import { useFormRegister } from "../../hooks/auth/useFormRegister.js";

export function Register() {
  const {
    userInfoRegister,
    userRol,
    passwordStatus,
    handleChangeUserInfoRegister,
    handleSelectrol,
    handleClickRedirectLogin,
    handleSubmitFormRegister,
    setPasswordStatus,
    validatePassword,
  } = useFormRegister();
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
                  placeholder="pepito@gmail.com"
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
                  <option value={1}>Seleccione su tipo de documento</option>
                  <option value={2}>Tarjeta de Identidad</option>
                  <option value={3}>Cedula de Ciudadania</option>
                  <option value={4}>Cedula de extranjeria</option>
                  <option value={5}>Nit</option>
                  <option value={6}>Pasaporte</option>
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
                  placeholder="30/10/2005"
                  name="usuborn"
                  value={userInfoRegister.usuborn}
                  onChange={(e) => handleChangeUserInfoRegister(e)}
                />
              </label>
              <div className="roles-block">
                <label className="roles-label">Selecciona tu rol:</label>

                <div className="roles-container">
                  <button
                    type="button"
                    className={`boton-register ${
                      userRol === "estudiante" ? "active" : ""
                    }`}
                    name="rolid"
                    onClick={() => handleSelectrol("estudiante")}
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
                      userRol === "docente" ? "active" : ""
                    }`}
                    name="rolid"
                    onClick={() => handleSelectrol("docente")}
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
                      userRol === "rector" ? "active" : ""
                    }`}
                    name="rolid"
                    onClick={() => handleSelectrol("rector")}
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
                <button className="btn-register-form" type="submit">Registrarse</button>
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
