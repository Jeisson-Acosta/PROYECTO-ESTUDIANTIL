import { Router } from "express"
import { StudentController } from "../controllers/studentController.js"
import { normalizeNameResource } from "../utils/normalizeNameResource.js"
import multer from "multer"
import path from "node:path"
import fs from "node:fs"

export const studentRouter = Router()

// ——— Configuración de multer para subir archivos de recursos ———
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = normalizeNameResource(req.body.cednom ?? 'sin_centro')
        const destPath = `uploads/resources/${folder}/student`
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


studentRouter.get('/classes/:usuid/:cedid/:cecid', StudentController.getClasses)
studentRouter.get('/class/:usuid/:cedid/:cecid/:asgcod', StudentController.getClass)
studentRouter.get('/task/:astid', StudentController.getTask)

studentRouter.post('/delivery-task', StudentController.deliveryTask)
studentRouter.post('/submit-task', upload.array('files', 10), StudentController.submitTask)

studentRouter.get('/calendar/:usuid/:cedid/:cecid', StudentController.getCalendar)
studentRouter.get('/notes/:cedid/:cecid/:usuid/:optionSP', StudentController.getNotes)
studentRouter.get('/info-resource/:usuid/:cedid/:cecid/:astid', StudentController.getInfoResource)

studentRouter.get('/schedule/:usuid/:cedid/:cecid', StudentController.getSchedule)
