//importar libreria bcrypt para hashear la contraseña
import bcrypt from 'bcrypt'
import { manageDB } from '../utils/manageDB.js'
import crypto from 'node:crypto'

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
            rolcod
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
                rolcod
            ])

            if (!result.ok) { throw new Error(result.message) }

            return result

            /* const [createdUser] = await connection.query(
                'SELECT * FROM tbl_usuario WHERE usuid = ?;',
                [result.insertId]
            )
            return createdUser[0] */
        } catch (err) {
            throw new Error('Error creating user')
        }
    }

    static async loginUser({ input }) {
        const {
            usuemail,
            usupwd
        } = input

        const existedUser = await manageDB(null, [usuemail], 'SELECT usuemail FROM tbl_usuario WHERE usuemail = ?', 'SL')
        if (!existedUser.ok) {
            existedUser.message = "Usuario no encontrado"
            return existedUser
        }

        const passwordInDB = await manageDB(null, [usuemail], 'SELECT usupwd FROM tbl_usuario WHERE usuemail = ?', 'SL')
        if (!passwordInDB.ok) {
            passwordInDB.message = "Contraseña incorrecta"
            return passwordInDB
        }

        // Comparar la contraseña con la escribio el usuario y la que esta en la DB
        const isPasswordValid = await bcrypt.compare(usupwd, passwordInDB.data[0].usupwd)
        if (!isPasswordValid) {
            passwordInDB.ok = false
            passwordInDB.data = null
            passwordInDB.message = 'Contraseña incorrecta'
            return passwordInDB
        }

        try {
            const result = await manageDB('sp_auth_login_user', [usuemail])
            if (!result.ok) { throw new Error(result.message) }
            return result

        } catch (err) {
            throw new Error('Error logging in user')
        }
    }
    
    static async forgotPasswordUser({ usuemail }) {
        try {

            // 1. Verificar si un usuario existe con el correo que llega por parametro
            const resultUser = await manageDB(null, [usuemail], 'SELECT COUNT(*) AS count FROM tbl_usuario WHERE usuemail = ?', 'SL')
            if (!resultUser.ok) { throw new Error(resultUser.message) }
            
            if (resultUser.data[0].count === 0) {
                resultUser.ok = false
                resultUser.data = null
                resultUser.message = "Usuario no encontrado"
                return resultUser
            }

            // 2. Verificar que el usuario no halla generado ya un token.
            const resultTokenDB = await manageDB(null, [usuemail], 'SELECT usupwdtoken, usupwdtoken_exp FROM tbl_usuario WHERE usuemail = ?', 'SL')
            if (!resultTokenDB.ok) { throw new Error(resultTokenDB.message) }

            if (resultTokenDB.data[0].usupwdtoken !== null && (resultTokenDB.data[0].usupwdtoken_exp !== null && Date.now() < resultTokenDB.data[0].usupwdtoken_exp)) {
                resultTokenDB.ok = false
                resultTokenDB.data = null
                resultTokenDB.message = 'Ya se ha enviado un correo anteriormente, por favor revisa tu bandeja de entrada'
                return resultTokenDB
            }

            // 3. Generar el token
            const rawToken = crypto.randomBytes(32).toString('hex')
            const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

            // 4. Guardamos el token en la DB con expiración de una hora.
                // Tener en cuenta que el tiempo lo calcula en el SP.
            const responseSaveTokenDB = await manageDB('sp_auth_save_token_forgot_password', [usuemail, hashedToken])
            if (!responseSaveTokenDB.ok) { throw new Error(responseSaveTokenDB.message) }
            
            return responseSaveTokenDB

        } catch(err) {
            throw new Error('Ocurred some error while generating forgot password')
        }
    }

    static async getUserInfoByEmail({ usuemail }) {
        try {
            const result = await manageDB('sp_auth_login_user', [usuemail]);
            if (!result.ok) { throw new Error(result.message) }
            return result;
        } catch (error) {
            // console.error('Error en getUserInfoByEmail:', error);
            throw error;
        }
    }

    static async getEducativeCenters() {
        try {
            const result = await manageDB(null, [], 'SELECT * FROM tbl_centro_educativo', 'SL')
            if (!result.ok) { throw new Error(result.message) }
            return result
        } catch (error) {
            throw new Error('Error getting educative centers')
        }
    }
}