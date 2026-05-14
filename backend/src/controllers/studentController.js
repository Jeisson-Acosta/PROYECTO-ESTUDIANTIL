import { StudentModel } from "../models/student.js"
import { validateClasses, validateClass, validateNotes, validateInfoResource, validateSubmitTask } from "../schemas/student.js"
import { validateCalendar, validateSchedule } from "../schemas/student.js"

export class StudentController {
    static async getClasses(req, res) {
        try {
            const resultValidate = validateClasses(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await StudentModel.getClasses({ data: resultValidate.data })
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

            const resultClass = await StudentModel.getClass({ data: resultValidate.data })
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
    static async getCalendar(req, res) {
        try {
            const resultValidate = validateCalendar(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const resultSchedule = await StudentModel.getCalendar(resultValidate.data)
            if (!resultSchedule.ok) return res.status(400).json({ message: resultSchedule.message })

            return res.status(200).json(resultSchedule)
        } catch (err) {
            console.log(err)
            throw new Error('Error geting schedule')
        }
    }
    static async getSchedule(req, res) {
        try {
            const resultValidate = validateSchedule(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const resultSchedule = await StudentModel.getSchedule(resultValidate.data)
            if (!resultSchedule.ok) return res.status(400).json({ message: resultSchedule.message })

            return res.status(200).json(resultSchedule)
        } catch (err) {
            console.log(err)
            throw new Error('Error geting schedule')
        }
    }

    static async getNotes(req, res) {
        try {
            const resultValidate = validateNotes(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await StudentModel.getNotes({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.json(result)
        } catch (err) {
            throw new Error('Error geting notes')
        }
    }

    static async getInfoResource(req, res) {
        try {
            const resultValidate = validateInfoResource(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await StudentModel.getInfoResource({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.json(result)
        } catch (err) {
            throw new Error('Error geting info resource student')
        }
    }

    static async submitTask(req, res) {
        try {
            const resultValidate = validateSubmitTask(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await StudentModel.submitTask({ data: resultValidate.data, files: req.files })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.json(result)
        } catch (err) {
            throw new Error('Error submitting task')
        }
    }

}