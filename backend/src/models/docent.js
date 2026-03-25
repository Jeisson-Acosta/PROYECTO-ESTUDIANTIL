import { manageDB } from "../utils/manageDB.js"

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
            // Rutas de los archivos guardados por multer (ej: "uploads/resources/1234-abc.pdf")
            const filePaths = files.map(f => f.path)

            const result = await manageDB('sp_docent_create_resource', [
                data.typeResource,
                data.title,
                data.description,
                data.date ?? null,
                data.hour ?? null,
                data.points ?? null,
                data.publishImmediately ?? false,
                data.lateDeliveries ?? false,
                JSON.stringify(filePaths)   // los paths de archivos como JSON string
            ])
            if (!result.ok) throw new Error(result.message)

            return result
        } catch (err) {
            throw new Error('Error creating resource docent: ' + err.message)
        }
    }
}
