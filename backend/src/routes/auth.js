import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

export const authRouter = Router()

authRouter.post('/login', AuthController.loginUser)
authRouter.post('/register', AuthController.registerUser)
authRouter.get('/checkSession', tokenMiddleware, AuthController.checkSession)
authRouter.get('/educative-centers', AuthController.getEducativeCenters)