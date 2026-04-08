import { Router } from "express";
import multer from "multer";
import path from 'node:path'
import fs from 'node:fs'

import { normalizeNameResource } from "../utils/normalizeNameResource.js";
import { ConfigAccountController } from "../controllers/configAccountController.js";

export const configAccountRouter = Router()

// ——— Configuración de multer para subir archivos de recursos ———
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // En multipart/form-data, req.body aun no está disponible en 'destination'.
        // Usamos una ruta fija o base para las fotos de perfil.
        const destPath = `uploads/profile-photos`
        fs.mkdirSync(destPath, { recursive: true })  // crea la carpeta si no existe
        cb(null, destPath)
    },
    filename: (req, file, cb) => {
        const usudocu = req.body.usudocu
        // Nombre original sin extensión + sufijo único para evitar colisiones
        // const nameWithoutExt = path.basename(file.originalname, path.extname(file.originalname))
        cb(null, `${usudocu}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })
// ————————————————————————————————————————————————————————————————

configAccountRouter.post('/upload-photo', upload.single('fotoPerfil'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ ok: false, message: 'No se subió ningún archivo' })
    }
    res.json({ 
        ok: true, 
        message: 'Foto subida correctamente', 
        file: req.file 
    })
})

configAccountRouter.get('/info-user', ConfigAccountController.getInfoConfigUser)