import { Router } from "express"
import { AuthController } from "../controllers/authController.js"
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js"

export const authRouter = Router()

authRouter.post('/login', AuthController.loginUser)
authRouter.post('/forgot-password', AuthController.forgotPasswordUser)
authRouter.post('/reset-password', AuthController.resetPasswordUser)
authRouter.post("/logout", AuthController.logoutUser)
authRouter.post('/register', AuthController.registerUser)
authRouter.put('/change-state-user', tokenMiddleware, AuthController.changeStateUser)

authRouter.get('/checkSession', tokenMiddleware, AuthController.checkSession)
authRouter.get('/educative-centers', AuthController.getEducativeCenters)