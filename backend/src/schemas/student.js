import z from 'zod'

const classesSchema = z.object({
    usuid: z.string({ required_error: 'The user id is required' })
})

export function validateClasses(data) {
    return classesSchema.safeParse(data)
}