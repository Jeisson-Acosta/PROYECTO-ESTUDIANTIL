//importar libreria bcrypt para hashear la contraseña
import bcrypt from 'bcrypt'
import { manageDB } from '../utils/manageDB.js'

export class AuthModel {
    static async registerUser({ input }) {
        const {
            usunom,
            usuemail,
            usupwd,
            usudocu,
            usucel,
            usufch_nacimiento,
            ceeid,
            tidid,
            rolid
        } = input

        // hashear contraseña
        const usuPwdHash = await bcrypt.hash(usupwd, 10)

        try {

            // sp -> store procedure.
            const result = await manageDB('sp_auth_register_user', [
                usunom,
                usuemail,
                usuPwdHash,
                usudocu,
                usucel,
                usufch_nacimiento,
                ceeid,
                tidid,
                rolid
            ])

            if (!result.ok) { throw new Error(result.message) }

            return result

            /* const [createdUser] = await connection.query(
                'SELECT * FROM tbl_usuario WHERE usuid = ?;',
                [result.insertId]
            )
            return createdUser[0] */
        } catch (err) {
            console.log(err)
            throw new Error('Error creating user')
        }
    }
}