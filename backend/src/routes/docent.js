import { Router } from "express";
import multer from "multer";
import path from "node:path";

import { DocentController } from "../controllers/docentController.js";

export const docentRouter = Router()

// ——— Configuración de multer para subir archivos de recursos ———
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/resources'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage })
// ————————————————————————————————————————————————————————————————

docentRouter.get('/classes/:usuid', DocentController.getClasses)
docentRouter.get('/classes/details/:asgcod', DocentController.getClassDetails)
docentRouter.post('/create-resource', upload.array('files', 10), DocentController.createResource)