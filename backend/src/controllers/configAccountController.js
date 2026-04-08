import { ConfigAccountModel } from "../models/configAccount.js"

export class ConfigAccountController {
    static async getInfoConfigUser(req, res) {
        try {
            const result = await ConfigAccountModel.getInfoConfigUser()
            if (!result.ok) throw new Error(result.message)
            return res.status(200).json(result)
        } catch(err) {
            return res.status(500).json({ ok: false, message: err.message })
        }
    }
}