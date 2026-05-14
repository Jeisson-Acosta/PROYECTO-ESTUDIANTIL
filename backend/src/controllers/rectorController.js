import { RectorModel } from "../models/rector.js"
import { validateGetCoursesByEducativeCenter, validateCreateStudent, validateGetInfoToCreateAsignature, validateCreateAsignatura } from "../schemas/rector.js"

export class RectorController {

    static async getCoursesByEducativeCenter(req, res) {
        try {
            const resultValidate = validateGetCoursesByEducativeCenter(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await RectorModel.getCoursesByEducativeCenter({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.json(result)

        } catch (err) {
            throw new Error('Error get courses by educative center')
        }
    }

    static async createStudent(req, res) {
        try {
            const resultValidate = validateCreateStudent(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await RectorModel.createStudent({ data: resultValidate.data })
            if (!result.ok) return res.json(result)

            return res.json(result)

        } catch (err) {
            throw new Error('Error create student')
        }
    }

    static async getInfoToCreateAsignature(req, res) {
        try {
            const resultValidate = validateGetInfoToCreateAsignature(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await RectorModel.getInfoToCreateAsignature({ data: resultValidate.data })
            if (!result.ok) return res.json(result)

            return res.json(result)

        } catch (err) {
            throw new Error('Error get docents by educative center')
        }
    }

    static async createAsignatura(req, res) {
        try {
            const resultValidate = validateCreateAsignatura(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await RectorModel.createAsignatura({ data: resultValidate.data })
            if (!result.ok) return res.json(result)

            return res.json(result)

        } catch (err) {
            throw new Error('Error create asignatura')
        }
    }

}