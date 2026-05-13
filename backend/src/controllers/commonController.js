import { getResource } from "../utils/getResource.js"
import { validateResourceParams } from "../schemas/common.js"

export class CommonController {
    static async getResourceFile(req, res) {
        try {
            const result = validateResourceParams(req.params)
            
            if (!result.success) { return res.status(400).json({ ok: false, message: result.error.issues[0].message }) }

            const { filename, cednom, role } = result.data;
            const resourceBase64 = getResource(filename, cednom, role);
            if (!resourceBase64) { return res.status(404).json({ ok: false, message: "Recurso no encontrado" }) }

            return res.status(200).json({ 
                ok: true, 
                data: resourceBase64, 
                message: "Recurso obtenido exitosamente" 
            })

        } catch(err) {
            return res.status(500).json({ ok: false, message: err.message })
        }
    }
}
