import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

import { normalizeNameResource } from "../utils/normalizeNameResource.js";

import { DocentController } from "../controllers/docentController.js";

export const docentRouter = Router()

// ——— Configuración de multer para subir archivos de recursos ———
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = normalizeNameResource(req.body.cednom ?? 'sin_centro')
        const destPath = `uploads/resources/${folder}/docent`
        fs.mkdirSync(destPath, { recursive: true })  // crea la carpeta si no existe
        cb(null, destPath)
    },
    filename: (req, file, cb) => {
        // Nombre original sin extensión + sufijo único para evitar colisiones
        const nameWithoutExt = path.basename(file.originalname, path.extname(file.originalname))
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, `${normalizeNameResource(nameWithoutExt)}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })
// ————————————————————————————————————————————————————————————————

docentRouter.get('/classes/:usuid', DocentController.getClasses)
docentRouter.get('/classes/details/:asgcod', DocentController.getClassDetails)
docentRouter.post('/create-resource', upload.array('files', 10), DocentController.createResource)

docentRouter.get('/students-list/:usuid/:cedid/:cecid/:asgid', DocentController.getStudentsList)
