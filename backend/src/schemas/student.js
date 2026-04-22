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

const taskSchema = z.object({
    astid: z.string({ required_error: 'The task id is required' })
})

export function validateTask(data) {
    return taskSchema.safeParse(data)
}