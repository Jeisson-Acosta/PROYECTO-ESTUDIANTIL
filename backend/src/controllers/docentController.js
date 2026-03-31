import { validateClasses, validateClassDetails, validateCreateResource } from "../schemas/docent.js";
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

    static async createResource(req, res) {
        try {
            // req.body → campos de texto del FormData (ya procesados por multer)
            // req.files → archivos subidos (ya guardados en uploads/resources/)
            const resultValidate = validateCreateResource(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.createResource({
                data: resultValidate.data,
                files: req.files ?? []
            })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)

        } catch (err) {
            console.error('Error en createResource:', err)
            return res.status(500).json({ ok: false, message: 'Error creando el recurso' })
        }
    }
}
