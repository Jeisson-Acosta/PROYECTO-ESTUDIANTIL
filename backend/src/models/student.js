import { manageDB } from "../utils/manageDB.js";
export class StudentModel {

    static async getClasses({ data }) {
        const { usuid, cedid, cecid } = data
        try {
            const result = await manageDB('sp_student_get_all_classes', [usuid, cedid, cecid])
            if (!result.ok) throw new Error(result.message)
            return result
        } catch (err) {
            throw new Error('Error geting classes: ' + err.message)
        }

    }

    static async getClass({ data }) {
        const { usuid, cedid, cecid, asgcod } = data
        try {
            const resultClass = await manageDB('sp_student_get_info_class', [usuid, cedid, cecid, asgcod])
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
            const resultSchedule = await manageDB('sp_student_get_calendar_info', [usuid, cedid, cecid])
            if (!resultSchedule.ok) throw new Error(resultSchedule.message)

            console.log('Calendar info:', resultSchedule)
            return resultSchedule

        } catch (err) {
            console.log('Error geting calendar:', err)
            throw new Error('Error geting calendar')
        }
    }
    static async getSchedule({ usuid, cedid, cecid }) {
        try {
            const resultSchedule = await manageDB('sp_student_get_schedule_info', [usuid, cedid, cecid])
            if (!resultSchedule.ok) throw new Error(resultSchedule.message)
            console.log('Schedule info:', resultSchedule)
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

    static async getInfoResource({ data }) {
        const { usuid, cedid, cecid, astid } = data
        try {
            const result = await manageDB('sp_student_get_info_resource', [usuid, cedid, cecid, astid])
            if (!result.ok) throw new Error(result.message)
            return result
        } catch (err) {
            throw new Error('Error geting info resource: ' + err.message)
        }
    }

    static async submitTask({ data, files }) {
        const {usuid, cedid, cecid, ateestado, astid} = data
        try {

            const filesInfo = files?.map(file => ({
                name: file.filename
            }))

            const result = await manageDB('sp_student_submit_task', [usuid, cedid, cecid, astid, ateestado, JSON.stringify(filesInfo)])
            if (!result.ok) throw new Error(result.message)

            return result

        } catch(err) {
            console.log(err)
            throw new Error('Error submitting task')
        }
    }

}