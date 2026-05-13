import z from 'zod';

const resourceSchema = z.object({
    filename: z.string().min(1, 'El nombre del archivo es requerido'),
    cednom: z.string().min(1, 'El nombre del centro educativo es requerido'),
    role: z.string().min(1, 'El rol es requerido')
});

export function validateResourceParams(input) {
    return resourceSchema.safeParse(input);
}
