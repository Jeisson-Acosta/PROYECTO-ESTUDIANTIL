import path from 'node:path';
import fs from 'node:fs';


export function getRecourse(nombre_recurso) {
    const uploaddir = path.resolve('uploads', 'resources');
    let recourseBase64 = null;
    try {
        if (fs.existsSync(uploaddir)) {
            const files = fs.readdirSync(uploaddir);
            const recourseFile = files.find(f => f.startsWith(`${nombre_recurso}.`));

            if (recourseFile) {
                const filePath = path.join(uploaddir, recourseFile);
                const fileBuffer = fs.readFileSync(filePath);

            }
        }
        return recourseBase64;
    } catch (error) {
        console.error('Error al obtener el recurso:', error);
    }
}