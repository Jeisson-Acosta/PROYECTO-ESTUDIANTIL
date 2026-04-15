import { Router } from "express";
import { StudentController } from "../controllers/studentController.js";
export const studentRouter = Router()

studentRouter.get('/classes/:usuid', StudentController.getClasses)
studentRouter.get('/class/:asgcod', StudentController.getClass)
studentRouter.get('/task/:astid', StudentController.getTask)
