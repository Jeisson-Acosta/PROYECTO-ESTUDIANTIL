import path from "node:path"
import { manageDB } from "../utils/manageDB.js"
import { normalizeNameResource } from "../utils/normalizeNameResource.js"

export class DocentModel {

    static async getClasses({ usuid }) {
        try {
            const result = await manageDB('sp_docent_get_all_classes', [usuid, 1, 1])
            if (!result.ok) throw new Error(result.message)

            return result
        } catch (err) {
            throw new Error('Error getting classes docent')
        }
    }

    static async getClassDetails({ asgcod }) {
        try {
            const result = await manageDB('sp_docent_get_info_class', [1, 1, 2, asgcod])
            if (!result.ok) throw new Error(result.message)

            return result
        } catch (err) {
            throw new Error('Error getting class details docent')
        }
    }

    static async createResource({ data, files }) {
        try {
            // f.filename = nombre real guardado por multer con sufijo: "tarea1-1234567890-987654321.pdf"
            // f.originalname = nombre original del navegador: "tarea1.pdf"
            const fileInfo = files.map(f => ({
                name: path.basename(f.filename, path.extname(f.filename)),  // "tarea1-1234567890-987654321"
                // path: f.path
            }))

            const result = await manageDB('sp_docent_create_resource', [
                1, // cedid
                1, // cecid
                data.usuid,
                1, // asgid
                data.title,
                data.description,
                data.dateInitial ?? null,
                data.dateFinal ?? null,
                data.points ?? null,
                data.typeResource,
                data.lateDeliveries ?? false,
                // data.hour ?? null,
                // data.publishImmediately ?? false,
                JSON.stringify(fileInfo)   // [{ name: "tarea1", path: "uploads/..." }, ...]
            ])
            
            if (!result.ok) throw new Error(result.message)

            return result
        } catch (err) {
            throw new Error('Error creating resource docent: ' + err.message)
        }
    }
}
