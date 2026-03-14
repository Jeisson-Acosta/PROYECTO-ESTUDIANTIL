import { manageDB } from "../utils/manageDB.js"

export class DocentModel {

    static async getClasses({ usuid }) {
        try {
            const result = await manageDB('sp_docent_get_all_classes', [usuid, 1, 1])
            if (!result.ok) throw new Error(result.message)

            return result
        } catch (err) {
            throw new Error('Error getting classes docent')
        }
    }
}
