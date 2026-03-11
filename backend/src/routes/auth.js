import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

export const authRouter = Router()

// Ruta para verificar el token con el middleware y devolver la información del usuario.
authRouter.get('/checkSession', tokenMiddleware, (req, res) => {
    const { user } = req.session
    res.json(user)
})
authRouter.post('/login', AuthController.loginUser)
authRouter.post('/register', AuthController.registerUser)