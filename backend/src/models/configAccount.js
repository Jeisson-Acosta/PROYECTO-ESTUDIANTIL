import { manageDB } from "../utils/manageDB.js"

export class ConfigAccountModel {
    static async getInfoConfigUser() {
        try {
            const result = await manageDB(null, [2], 'SELECT usunom, usuemail, usudocu, usucel, usufch_nacimiento FROM tbl_usuario WHERE usuid = ?;', 'SL')
            if (!result.ok) throw new Error(result.message)
            return result
        } catch(err) {
            throw new Error('Error getting info config user')
        }
    }
}