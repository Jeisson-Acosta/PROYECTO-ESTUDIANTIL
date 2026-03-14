import z from 'zod'

const classesSchema = z.object({
    usuid: z.string({
        required_error: 'The user id is required',
        invalid_type_error: 'The user id must be a string'
    })
})

export function validateClasses(input) {
    return classesSchema.safeParse(input)
}