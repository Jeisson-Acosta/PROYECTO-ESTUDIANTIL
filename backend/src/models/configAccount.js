import { manageDB } from "../utils/manageDB.js"
import path from "node:path"

export class ConfigAccountModel {
    static async getInfoConfigUser() {
        try {
            const result = await manageDB('sp_config_get_info_user', [2, 1, 1])
            if (!result.ok) throw new Error(result.message)
            return result
        } catch(err) {
            throw new Error('Error getting info config user')
        }
    }
}