import path from 'node:path';
import fs from 'node:fs';

const MIME_TYPES = {
    'pdf': 'application/pdf',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'doc': 'application/msword',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xls': 'application/vnd.ms-excel',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'ppt': 'application/vnd.ms-powerpoint',
    'txt': 'text/plain',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif'
};

export function getRecourse(nombre_recurso, cednom) {
    console.log(cednom)
    const uploaddir = path.resolve('uploads', 'resources', cednom.split(' ').join('_').toLowerCase(), 'docent');
    let recourseBase64 = null;

    try {
        if (fs.existsSync(uploaddir)) {
            const files = fs.readdirSync(uploaddir);
            const recourseFile = files.find(f => f.startsWith(`${nombre_recurso}.`));

            if (recourseFile) {
                const filePath = path.join(uploaddir, recourseFile);
                const fileBuffer = fs.readFileSync(filePath);
                const ext = path.extname(recourseFile).substring(1).toLowerCase();
                const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

                recourseBase64 = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
            }
        }
        return recourseBase64;
    } catch (error) {
        console.error('Error al obtener el recurso:', error);
        return null;
    }
}