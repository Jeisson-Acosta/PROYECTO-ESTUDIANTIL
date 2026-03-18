import z from 'zod'

const classesSchema = z.object({
    usuid: z.string({
        required_error: 'The user id is required',
        invalid_type_error: 'The user id must be a string'
    })
})

const classDetailsSchema = z.object({
    asgcod: z.string({
        required_error: 'The assignment code is required',
        invalid_type_error: 'The assignment code must be a string'
    })
})

export function validateClasses(input) {
    return classesSchema.safeParse(input)
}

export function validateClassDetails(input) {
    return classDetailsSchema.safeParse(input)
}