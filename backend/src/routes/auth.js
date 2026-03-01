import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = Router()

authRouter.get('/checkSession', authMiddleware, (req, res) => {
    const { user } = req.session
    res.json(user)
})
authRouter.post('/login', AuthController.loginUser)
authRouter.post('/register', AuthController.registerUser)