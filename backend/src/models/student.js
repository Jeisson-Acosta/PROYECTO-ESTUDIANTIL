import { manageDB } from "../utils/manageDB.js";
export class StudentModel {

    static async getClasses({ usuid }) {
        try {
            const result = await manageDB('sp_student_get_all_classes', [usuid])
            if (!result.ok) throw new Error(result.message)
            return result
        } catch(err) {
            throw new Error('Error geting classes')
        }

    }
    
}