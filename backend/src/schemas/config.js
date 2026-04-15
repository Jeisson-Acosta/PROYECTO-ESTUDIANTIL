import z from 'zod'

const updateInfoUserSchema = z.object({
    usuid: z.number().min(1, 'The id is required'),
    usunom: z.string().min(1, 'The name is required'),
    usuemail: z.string().email('The email is required'),
    usudocu: z.string().min(1, 'The document is required'),
    usucel: z.string().min(1, 'The cell is required')
})

export function validateUpdateInfoUser({ input }) {
    return updateInfoUserSchema.safeParse(input)
}