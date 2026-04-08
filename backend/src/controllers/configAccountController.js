import { ConfigAccountModel } from "../models/configAccount.js"
import { getProfilePhoto } from "../utils/getProfilePhoto.js"

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
}