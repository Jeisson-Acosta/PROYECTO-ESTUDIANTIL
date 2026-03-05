import { AuthModel } from "../models/auth.js";
import { validateRegister, validateLogin } from "../schemas/auth.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";

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
      const { usuid, usunom, usuemail, rolcod } = result.data[0];


      const token = jwt.sign(
        { usuid, usunom, usuemail, rolcod }, // PAYLOAD
        SECRET_JWT_KEY, // SECRET KEY
        { expiresIn: "1h" },
      );
      const responseData = {
        ok: true, // ← Ahora es un array con un objeto dentro
        usuid,
        usunom,
        usuemail,
        rolcod,
      };


      return res
        .cookie("access_token", token, {
          httpOnly: true, // La cookie solo se puede acceder en el servidor.
          secure: process.env.NODE_ENV === "production", // La cookie solo se puede acceder desde HTTPS
          sameSite: "strict", // La cookie solo se puede acceder desde el mismo dominio
          maxAge: 1000 * 60 * 60, // La cookie expira en una hora
        })
        .json(responseData);
      // return res.status(200).json(result)
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}
