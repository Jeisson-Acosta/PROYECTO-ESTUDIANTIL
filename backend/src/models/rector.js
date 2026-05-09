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
}