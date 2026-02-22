import mysql from 'mysql2/promise'

// La configuración de la DB
const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Agil',
    database: 'cefcoc_dev',
    connectionLimit: 10, // Maximo de conexiones simultaneas
}

// Esta funcion nos permite ejecutar cualquier SP de la base de datos.
export async function manageDB(nameSP, params) {
    /* 
        nameSP -> Nombre del SP que se va a ejecutar.
        params -> Parametros que se van a pasar al SP.
    */

    const RESPONSE_DB = {
        ok: false, // true or false -> Determina si la petición a la base de datos fue exitosa o no.
        data: null, // Los datos retornados que nos dio la base de datos.
        message: '' // Mensaje que se retorna si fue exitosa o no.
    }

    const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
    const connectionPool = mysql.createPool(connectionString)

    try {
        const [response] = await connectionPool.query(`CALL ${nameSP}(${params.map(() => '?').join(',')})`, params)
        RESPONSE_DB.ok = true
        RESPONSE_DB.data = response[0]
        RESPONSE_DB.message = "Petición exitosa"
    } catch(e) {
        RESPONSE_DB.ok = false
        RESPONSE_DB.message = `Error al ejecutar la petición: ${e.message}`

    } finally {
        connectionPool.end()
    }

    return RESPONSE_DB
}