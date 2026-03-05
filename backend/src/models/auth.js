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
        const isPasswordValid = await bcrypt.compare(usupwd, passwordInDB.data.usupwd)
        if (!isPasswordValid) {
            passwordInDB.ok = false
            passwordInDB.data = null
            passwordInDB.message = 'Contraseña incorrecta'
            return passwordInDB
        }

        try {
            console.log('Llamando a sp_auth_login_user con email:', usuemail);
            const result = await manageDB('sp_auth_login_user', [usuemail])
            /*console.log('2️⃣ result COMPLETO:', JSON.stringify(result, null, 2));
            console.log('3️⃣ result.data:', result.data);
            console.log('4️⃣ result.data[0]:', result.data[0]);
            console.log('5️⃣ result.data[1]:', result.data[1]);
            console.log('6️⃣ result.data[1][0]:', result.data[1]?.[0]);*/
            if (!result.ok) { throw new Error(result.message) }
            const userInfo = result.data[0]?.[0]
            //console.log('7️⃣ userInfo:', userInfo);
            if (!userInfo) {
                return {
                    ok: false,
                    data: null,
                    message: 'Usuario no encontrado'
                }
            }



            return {
                result
            }


        } catch (err) {
            throw new Error('Error logging in user')
        }
    }
}