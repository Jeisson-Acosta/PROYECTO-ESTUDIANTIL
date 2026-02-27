import { AuthModel } from "../models/auth.js";
import { validateRegister, validateLogin } from "../schemas/auth.js";
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from "../config/config.js";

export class AuthController {
    static async registerUser(req, res) {
        const resultValidate = validateRegister(req.body)

        // Acá este error lo debemos mandar a un recurso para que guarde el log.
        if (!resultValidate.success) { return res.status(400).json({ error: JSON.parse(resultValidate.error.message) }) }

        try {
            const result = await AuthModel.registerUser({ input: resultValidate.data })
            return res.status(201).json(result)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }

    static async loginUser(req, res) {
        const resultValidate = validateLogin(req.body)
        
        // Acá este error lo debemos mandar a un recurso para que guarde el log.
        if (!resultValidate.success) { return res.status(400).json({ error: JSON.parse(resultValidate.error.message) }) }

        try {
            const result = await AuthModel.loginUser({ input: resultValidate.data })
            if (!result.ok) return res.json(result)
            const token = jwt.sign(
                { usuid: result.data.usuid, usunom: result.data.usunom }, // PAYLOAD
                SECRET_JWT_KEY, // SECRET KEY
                { expiresIn: '1h' }
            )
            // result.data.token = token
            return res.cookie('access_token', token, {
                httpOnly: true, // La cookie solo se puede acceder en el servidor.
                secure: process.env.NODE_ENV === 'production', // La cookie solo se puede acceder desde HTTPS
                sameStrict: 'strict', // La cookie solo se puede acceder desde el mismo dominio
                maxAge: 10000 * 60 * 60 // La cookie expira en una hora
            }).json(result)
            // return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
}