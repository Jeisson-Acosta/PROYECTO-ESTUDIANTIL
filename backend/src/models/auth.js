import mysql from 'mysql2/promise'
//importar libreria bcrypt para hashear la contraseña
import bcrypt from 'bcryptjs'
// La configuración de la DB
const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: '',
    database: 'cefcoc_dev'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

// Crear conexión con MYSQL
const connection = await mysql.createConnection(connectionString)

export class AuthModel {
    static async registerUser({ input }) {
        const {
            usunom,
            usuemail,
            usupwd,
            usudocu,
            usucel,
            rolid,
            tidid
        } = input
        //hashear contraseña
        const usuhash = await bcrypt.hash(usupwd,10)
        try {
            const [result] = await connection.query(
                `INSERT INTO tbl_usuario (usunom, usuemail, usupwd, usudocu, usucel, rolid, tidid)
                VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [usunom, usuemail, usuhash, usudocu, usucel, rolid, tidid]
            )

            const [createdUser] = await connection.query(
                'SELECT * FROM tbl_usuario WHERE usuid = ?;',
                [result.insertId]
            )
            return createdUser[0]
        } catch (err) {
            throw new Error('Error creating user')
        }
    }
}