import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

export function authMiddleware(req, res, next) {
    const token = req.cookies.access_token

    if (!token) {
        return res.status(401).json({ ok: false, message: 'No autorizado' })
    }

    req.session = { user: null }

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data
        next()
    } catch {
        return res.status(401).json({ ok: false, message: 'Token invalido' })
    }
}