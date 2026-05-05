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

const calendarSchema = z.object({
    usuid: z.string({ required_error: 'The user id is required' }),
    cedid: z.string({ required_error: 'The id of the educational center is required' }),
    cecid: z.string({ required_error: 'The id of the cycle is required' }),
})

export function validateCalendar(data) {
    return calendarSchema.safeParse(data)
}
const scheduleSchema = z.object({
    usuid: z.string({ required_error: 'The user id is required' }),
    cedid: z.string({ required_error: 'The id of the educational center is required' }),
    cecid: z.string({ required_error: 'The id of the cycle is required' }),
})

export function validateSchedule(data) {
    return scheduleSchema.safeParse(data)
}
