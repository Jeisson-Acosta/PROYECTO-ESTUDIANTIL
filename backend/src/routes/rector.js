import { Router } from "express";
import { RectorController } from "../controllers/rectorController.js";

export const rectorRouter = Router()

rectorRouter.get('/courses-by-educative-center/:cedid', RectorController.getCoursesByEducativeCenter)
rectorRouter.get('/info-to-create-asignature/:cedid/:cecid/:usuid', RectorController.getInfoToCreateAsignature)

rectorRouter.post('/create-student', RectorController.createStudent)
rectorRouter.post('/create-asignatura', RectorController.createAsignatura)