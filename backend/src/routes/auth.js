import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = Router()


authRouter.post('/login', AuthController.loginUser)
authRouter.post('/register', AuthController.registerUser)
authRouter.get('/checkSession', authMiddleware, AuthController.checkSession)