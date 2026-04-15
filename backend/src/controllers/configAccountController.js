import { ConfigAccountModel } from "../models/configAccount.js"
import { getProfilePhoto } from "../utils/getProfilePhoto.js"
import { validateUpdateInfoUser } from "../schemas/config.js"

export class ConfigAccountController {
    static async getInfoConfigUser(req, res) {
        try {
            const result = await ConfigAccountModel.getInfoConfigUser()
            if (!result.ok) throw new Error(result.message)
            
            const user = result.data[0]
            //  user.usufch_nacimiento = user.usufch_nacimiento.toISOString().split('T')[0].split('-').reverse().join('-')
            if (user) {
                user.usufoto_perfil = getProfilePhoto({ usudocu: user.usudocu })
            }

            return res.status(200).json(result)
        } catch(err) {
            return res.status(500).json({ ok: false, message: err.message })
        }
    }

    static async updateInfoUser(req, res) {
        try {
            const result = validateUpdateInfoUser({ input: req.body })
            if (!result.success) throw new Error(result.error.issues[0].message)

            const resultDB = await ConfigAccountModel.updateInfoUser({ input: req.body })
            if (!resultDB.ok) throw new Error(resultDB.message)
                
            return res.status(200).json(resultDB)
        } catch(err) {
            return res.status(500).json({ ok: false, message: err.message })
        }
    }
}