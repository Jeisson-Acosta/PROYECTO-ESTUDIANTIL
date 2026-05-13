import { Router } from "express";
import { CommonController } from "../controllers/commonController.js";

export const commonRouter = Router();

commonRouter.get("/download-resource/:cednom/:role/:filename", CommonController.getResourceFile);
