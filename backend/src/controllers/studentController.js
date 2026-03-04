import { StudentModel } from "../models/student.js"
import { validateClasses } from "../schemas/student.js"
export class StudentController {
    static async getClasses(req, res) {
        try {
            const resultValidate = validateClasses(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await StudentModel.getClasses({ usuid: parseInt(resultValidate.data.usuid) })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)
        } catch (err) {
            throw new Error('Error geting classes')
        }
    }
}