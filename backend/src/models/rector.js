import { manageDB } from "../utils/manageDB.js"
import bcrypt from 'bcrypt'

export class RectorModel {
    static async getCoursesByEducativeCenter({ data }) {
        try {

            const resultDB = await manageDB(null, [data.cedid], 'SELECT JSON_ARRAYAGG(JSON_OBJECT("edccod", edccod, "edcnom", edcnom)) as courses FROM tbl_centro_educativo_curso WHERE cedid = ?', 'SL')
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB

        } catch (err) {
            throw new Error('Error get courses by educative center: ' + err.message)
        }
    }

    static async createStudent({ data }) {
        const { cedid, cecid, usuid, usunom, tidcod, usudocu, usufch_nacimiento, usuemail, usucel, edccod, usupwd } = data
        try {

            const existsUserWithEmail = await manageDB(null, [usuemail], 'SELECT COUNT(*) AS count FROM tbl_usuario WHERE usuemail = ?', 'SL')
            if (!existsUserWithEmail.ok) throw new Error(existsUserWithEmail.message)
            if (existsUserWithEmail.data[0].count > 0) {
                existsUserWithEmail.ok = false
                existsUserWithEmail.message = 'Ya existe un usuario con este correo'
                return existsUserWithEmail
            }

            const usupwdHash = await bcrypt.hash(usupwd, 10)

            const resultDB = await manageDB('sp_rector_create_student', [cedid, cecid, usuid, usunom, tidcod, usudocu, usufch_nacimiento, usuemail, usucel, edccod, usupwdHash])
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB

        } catch (err) {
            throw new Error('Error create student: ' + err.message)
        }
    }

    static async getInfoToCreateAsignature({ data }) {
        const { cedid, cecid, usuid } = data
        try {

            const resultDB = await manageDB('sp_rector_get_info_to_create_asignatura', [cedid, cecid, usuid])
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB

        } catch (err) {
            throw new Error('Error get docents by educative center.')
        }
    }

    static async createAsignatura({ data }) {
        try {
            const resultDB = await manageDB('sp_rector_create_asignatura', [data.usuid, data.cedid, data.cecid, JSON.stringify(data.info_asignatura)])
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB
        } catch (err) {
            throw new Error('Error create asignature')
        }
    }

    static async getAllAsignaturesInfo({ data }) {
        const { usuid, cedid, cecid } = data
        try {

            const resultDB = await manageDB('sp_rector_get_all_asignatures_info', [usuid, cedid, cecid])
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB

        } catch (err) {
            throw new Error('Error get all asignatures info')
        }
    }

    static async getAllDocents({ cedid }) {
        try {
            
            const resultDB = await manageDB(null, [cedid], 'SELECT JSON_ARRAYAGG(JSON_OBJECT("usuid", usuid, "usunom", usunom)) as docents FROM tbl_usuario WHERE cedid = ? AND rolid = (SELECT rolid FROM tbl_rol WHERE rolcod = "DOC")', 'SL')
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB
        } catch (err) {
            throw new Error('Error get all docents')
        }
    }
    static async createCourse({ data }) {
        const { usuid, cedid, cecid, edccod, edcnom, usuid_docente } = data
        try {
            const resultDB = await manageDB('sp_rector_create_course', [usuid, cedid, cecid, edccod, edcnom, usuid_docente])
            if (!resultDB.ok) throw new Error(resultDB.message)

            return resultDB
        } catch (err) {
            throw new Error('Error create course')
        }
    }
}