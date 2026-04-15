import path from 'node:path'
import fs from 'node:fs'

export function getProfilePhoto({ usudocu }) {
    const uploadDir = path.resolve('uploads', 'profile-photos')
    let photoBase64 = null
    try {
        if (fs.existsSync(uploadDir)) {
            const files = fs.readdirSync(uploadDir)
            const photoFile = files.find(f => f.startsWith(`${usudocu}.`))
            
            if (photoFile) {
                const filePath = path.join(uploadDir, photoFile)
                const fileBuffer = fs.readFileSync(filePath)
                const ext = path.extname(photoFile).substring(1) // remueve el punto
                photoBase64 = `data:image/${ext};base64,${fileBuffer.toString('base64')}`
            }
        }
        return photoBase64
    } catch (error) {
        console.error('Error al obtener la foto de perfil:', error)
    }
}
    
