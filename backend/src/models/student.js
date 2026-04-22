import { manageDB } from "../utils/manageDB.js";
export class StudentModel {

    static async getClasses({ usuid }) {
        try {
            const result = await manageDB('sp_student_get_all_classes', [usuid, 1, 1]) // Change '1' for real info at educative center
            if (!result.ok) throw new Error(result.message)
            return result
        } catch (err) {
            throw new Error('Error geting classes')
        }

    }

    static async getClass({ asgcod }) {
        try {
            const resultClass = await manageDB('sp_student_get_info_class', [1, 1, 1, asgcod])
            console.log(resultClass)
            if (!resultClass.ok) throw new Error(resultClass.message)

            return resultClass
        } catch (err) {
            throw new Error('Error geting info class')
        }
    }

    static async getTask({ astid }) {
        try {
            const resultTask = await manageDB('sp_student_get_info_task', [1, 1, 1, astid])
            console.log(resultTask)
            if (!resultTask.ok) throw new Error(resultTask.message)

            return resultTask
        } catch (err) {
            throw new Error('Error geting info task')
        }
    }
    static async deliveryTask({ usuid, cedid, cecid, astid }) {
        try {
            const resultDelivery = await manageDB('sp_student_delivery_task', [usuid, cedid, cecid, astid])
            console.log(resultDelivery)
            if (!resultDelivery.ok) throw new Error(resultDelivery.message)

            return resultDelivery
        } catch (err) {
            throw new Error('Error delivering task')
        }
    }

}