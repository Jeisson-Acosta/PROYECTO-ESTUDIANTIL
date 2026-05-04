import { manageDB } from "../utils/manageDB.js";
export class StudentModel {

    static async getClasses({ usuid }) {
        try {
            const result = await manageDB('sp_student_get_all_classes', [usuid, 1, 1]) // Change '1' for real info at educative center
            if (!result.ok) throw new Error(result.message)
            return result
        } catch (err) {
            throw new Error('Error geting classes: ' + err.message)
        }

    }

    static async getClass({ asgcod }) {
        try {
            const resultClass = await manageDB('sp_student_get_info_class', [1, 1, 1, asgcod])
            if (!resultClass.ok) throw new Error(resultClass.message)

            return resultClass
        } catch (err) {
            throw new Error('Error geting info class: ' + err.message)
        }
    }

    static async getTask({ astid }) {
        try {
            const resultTask = await manageDB('sp_student_get_info_task', [1, 1, 1, astid])
            if (!resultTask.ok) throw new Error(resultTask.message)

            return resultTask
        } catch (err) {
            throw new Error('Error geting info task: ' + err.message)
        }
    }
    static async deliveryTask({ usuid, cedid, cecid, astid }) {
        try {
            const resultDelivery = await manageDB('sp_student_delivery_task', [usuid, cedid, cecid, astid])
            if (!resultDelivery.ok) throw new Error(resultDelivery.message)

            return resultDelivery
        } catch (err) {
            throw new Error('Error delivering task: ' + err.message)
        }
    }

    static async getCalendar({ usuid, cedid, cecid }) {
        try {
            const resultSchedule = await manageDB('sp_student_get_calendar', [usuid, cedid, cecid])
            if (!resultSchedule.ok) throw new Error(resultSchedule.message)

            return resultSchedule
        } catch (err) {
            throw new Error('Error geting schedule: ' + err.message)
        }
    }

    static async getNotes({ data }) {
        const { cedid, cecid, usuid, optionSP } = data
        try {
            const result = await manageDB('sp_student_get_notes', [cedid, cecid, usuid, optionSP])
            if (!result.ok) throw new Error(result.message)
            return result
        } catch (err) {
            throw new Error('Error geting notes at the student: ' + err.message)
        }
    }

}