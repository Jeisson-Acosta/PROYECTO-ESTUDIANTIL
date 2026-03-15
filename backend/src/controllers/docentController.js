import { validateClasses, validateClassDetails } from "../schemas/docent.js";
import { DocentModel } from "../models/docent.js";

export class DocentController {
    static async getClasses(req, res) {
        try {
            const resultValidate = validateClasses(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getClasses({ usuid: parseInt(resultValidate.data.usuid) })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)

        } catch (err) {
            throw new Error('Error getting classes docent')
        }
    }
    
    static async getClassDetails(req, res) {
        try {
            const resultValidate = validateClassDetails(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getClassDetails({ asgcod: resultValidate.data.asgcod })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)

        } catch (err) {
            throw new Error('Error getting class details docent')
        }
    }


}