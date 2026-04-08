import { AuthModel } from "../models/auth.js";
import { validateRegister, validateLogin } from "../schemas/auth.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";
import { getProfilePhoto } from "../utils/getProfilePhoto.js";

export class AuthController {
  static async registerUser(req, res) {
    const resultValidate = validateRegister(req.body);

    // Acá este error lo debemos mandar a un recurso para que guarde el log.
    if (!resultValidate.success) {
      return res
        .status(400)
        .json({ error: JSON.parse(resultValidate.error.message) });
    }

    try {
      const result = await AuthModel.registerUser({
        input: resultValidate.data,
      });
      return res.status(201).json(result);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  static async loginUser(req, res) {
    const resultValidate = validateLogin(req.body);

    // Acá este error lo debemos mandar a un recurso para que guarde el log.
    if (!resultValidate.success) {
      return res
        .status(400)
        .json({ error: JSON.parse(resultValidate.error.message) });
    }

    try {
      const result = await AuthModel.loginUser({ input: resultValidate.data });
      if (!result.ok) return res.json(result);

      const infoUser = JSON.parse(result.data[0].info_user)
      const { usuid, usunom, usuemail, rolcod } = infoUser
      infoUser.usufoto_perfil = getProfilePhoto({ usudocu: infoUser.usudocu })
      result.data[0].info_user = JSON.stringify(infoUser)

      const token = jwt.sign(
        { usuid, usunom, usuemail, rolcod }, // PAYLOAD
        SECRET_JWT_KEY, // SECRET KEY
        { expiresIn: "1h" },
      );

      return res
        .cookie("access_token", token, {
          httpOnly: true, // La cookie solo se puede acceder en el servidor.
          secure: process.env.NODE_ENV === "production", // La cookie solo se puede acceder desde HTTPS
          sameSite: "strict", // La cookie solo se puede acceder desde el mismo dominio
          maxAge: 1000 * 60 * 60, // La cookie expira en una hora
        })
        .json(result);

    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  static async logoutUser(req, res){
    res.clearCookie("access_token").json({ok: true, message: "Logout successful"})
  }

  static async checkSession(req, res) {
    const { user } = req.session
    const resultInfoUser = await AuthModel.getUserInfoByEmail({ usuemail: user.usuemail })
    if (!resultInfoUser.ok) return res.json(resultInfoUser)
    JSON.parse(resultInfoUser.data[0].info_user).usufoto_perfil = getProfilePhoto({ usudocu: JSON.parse(resultInfoUser.data[0].info_user).usudocu })

    res.json(resultInfoUser)
  }

  static async getEducativeCenters(req, res) {
    try {
      const result = await AuthModel.getEducativeCenters()
      if (!result.ok) return res.json(result)
      res.json(result)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
