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

const createResourceSchema = z.object({
    usuid: z.string({
        required_error: 'The user id is required',
        invalid_type_error: 'The user id must be a number'
    }).transform(val => Number(val)),
    typeResource: z.enum(['TA', 'MA', 'EN'], {
        required_error: 'The type resource is required',
        invalid_type_error: 'The type resource must be TA, MA or EN'
    }),
    title: z.string({
        required_error: 'The title is required',
        invalid_type_error: 'The title must be a string'
    }),
    description: z.string({
        required_error: 'The description is required',
        invalid_type_error: 'The description must be a string'
    }),
    dateInitial: z.string().nullable(),
    dateFinal: z.string().nullable().transform(val => val === '' ? null : val),
    hour: z.string().nullable(),
    points: z.string().transform(val => val === '' || val === null ? null : Number(val)).nullable(),
    publishImmediately: z.string().transform(val => val === 'true').optional(),
    lateDeliveries: z.string().transform(val => val === 'true').optional()
})

const studentsListSchema = z.object({
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
    asgid: z.string({
        required_error: 'The asgid is required',
        invalid_type_error: 'The asgid must be a string'
    }).transform(val => Number(val))
})

export function validateClasses(input) {
    return classesSchema.safeParse(input)
}

export function validateClassDetails(input) {
    return classDetailsSchema.safeParse(input)
}

export function validateCreateResource(input) {
    return createResourceSchema.partial().safeParse(input)
}

export function validateStudentsList(input) {
    return studentsListSchema.safeParse(input)
}