import { AuthModel } from "../models/auth.js";
import { validateRegister } from "../schemas/auth.js";

export class AuthController {
    static async registerUser(req, res) {
        const resultValidate = validateRegister(req.body)

        if (!resultValidate.success) { return res.status(400).json({ error: JSON.parse(resultValidate.error.message) }) }

        try {
            const result = await AuthModel.registerUser({ input: resultValidate.data })
            return res.status(201).json(result)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }
}