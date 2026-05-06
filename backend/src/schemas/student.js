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

const notesSchema = z.object({
    usuid: z.string({
        required_error: 'The user id is required',
        invalid_type_error: 'The user id must be a number'
    }).transform(val => Number(val)),
    cedid: z.string({
        required_error: 'The cedid is required',
        invalid_type_error: 'The cedid must be a string'
    }).transform(val => Number(val)),
    cecid: z.string({
        required_error: 'The cecid is required',
        invalid_type_error: 'The cecid must be a string'
    }).transform(val => Number(val)),
    optionSP: z.string({
        required_error: 'The optionSP is required',
        invalid_type_error: 'The optionSP must be a string'
    })

})

export function validateNotes(data) {
    return notesSchema.safeParse(data)
}

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
