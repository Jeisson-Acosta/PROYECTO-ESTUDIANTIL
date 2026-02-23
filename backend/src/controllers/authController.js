import { AuthModel } from "../models/auth.js";
import { validateRegister, validateLogin } from "../schemas/auth.js";

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
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
}