import { Router } from "express";
import { RectorController } from "../controllers/rectorController.js";

export const rectorRouter = Router()

rectorRouter.get('/courses-by-educative-center/:cedid', RectorController.getCoursesByEducativeCenter)

rectorRouter.post('/create-student', RectorController.createStudent)