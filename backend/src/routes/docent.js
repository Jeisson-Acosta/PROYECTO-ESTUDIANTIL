import { Router } from "express";
import { DocentController } from "../controllers/docentController.js";

export const docentRouter = Router()

docentRouter.get('/classes/:usuid', DocentController.getClasses)