import z from 'zod'

const classesSchema = z.object({
    usuid: z.string({ required_error: 'The user id is required' })
})

export function validateClasses(data) {
    return classesSchema.safeParse(data)
}

const classSchema = z.object({
    asgcod: z.string({ required_error: 'The class code is required' })
})

export function validateClass(data) {
    return classSchema.safeParse(data)
}