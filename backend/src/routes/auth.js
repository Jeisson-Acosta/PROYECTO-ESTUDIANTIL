import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

export const authRouter = Router()

// authRouter.post('/login', Controller)
authRouter.post('/register', AuthController.registerUser)