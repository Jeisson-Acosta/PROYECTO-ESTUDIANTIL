import { StudentModel } from "../models/student.js"
import { validateClasses, validateClass } from "../schemas/student.js"

export class StudentController {
    static async getClasses(req, res) {
        try {
            const resultValidate = validateClasses(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await StudentModel.getClasses({ usuid: parseInt(resultValidate.data.usuid) })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)
        } catch (err) {
            throw new Error('Error getting classes')
        }
    }

    static async getClass(req, res) {
        try {
            const resultValidate = validateClass(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const resultClass = await StudentModel.getClass({ asgcod: resultValidate.data.asgcod })
            if (!resultClass.ok) return res.status(400).json({ message: resultClass.message })

            return res.status(200).json(resultClass)
        } catch (err) {
            throw new Error('Error getting class')
        }
    }
    static async getTask(req, res) {
        try {
            const resultValidate = validateTask(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const resultTask = await StudentModel.getTask({ astid: resultValidate.data.astid })
            if (!resultTask.ok) return res.status(400).json({ message: resultTask.message })

            return res.status(200).json(resultTask)
        } catch (err) {
            throw new Error('Error getting task')
        }
    }
    static async deliveryTask(req, res) {
        try {
            const resultValidate = validateDeliveryTask(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const resultDelivery = await StudentModel.deliveryTask(resultValidate.data)
            if (!resultDelivery.ok) return res.status(400).json({ message: resultDelivery.message })

            return res.status(200).json(resultDelivery)
        } catch (err) {
            throw new Error('Error delivering task')
        }
    }

}