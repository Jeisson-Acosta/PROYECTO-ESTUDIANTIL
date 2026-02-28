<<<<<<< HEAD
export function authMiddleware(req, res, next) {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ ok: false, message: 'No autorizado' })
    }
    req.session = { user: null }
=======
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

export function authMiddleware(req, res, next) {
    const token = req.cookies.access_token

    if (!token) {
        return res.status(401).json({ ok: false, message: 'No autorizado' })
    }

    req.session = { user: null }

>>>>>>> 85f629f9513667d2430cc7c0e65b5efe38e2c5df
    try {
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data
        next()
<<<<<<< HEAD
    } catch (error) {
=======
    } catch {
>>>>>>> 85f629f9513667d2430cc7c0e65b5efe38e2c5df
        return res.status(401).json({ ok: false, message: 'Token invalido' })
    }
}