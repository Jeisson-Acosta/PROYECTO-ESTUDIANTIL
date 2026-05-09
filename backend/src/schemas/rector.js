import z from 'zod'

const getCoursesByEducativeCenterSchema = z.object({
    cedid: z.string({
        required_error: 'The cedid is required',
        invalid_type_error: 'The cedid must be a string'
    }).transform(val => Number(val))
})

const createStudentSchema = z.object({
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val)),
    cecid: z.string({ required_error: 'The educative center code is required' }).transform(val => Number(val)),
    usuid: z.string({ required_error: 'The user id is required' }).transform(val => Number(val)),
    usunom: z.string({ required_error: 'The name is required' }),
    tidcod: z.string({ required_error: 'The type of document code is required' }),
    usudocu: z.string({ required_error: 'The document is required' }),
    usufch_nacimiento: z.string({ required_error: 'The birth date is required' }),
    usuemail: z.email({ required_error: 'The email is required' }),
    usucel: z.string({ required_error: 'The cell phone is required' }),
    edccod: z.string({ required_error: 'The educative center code is required' }),
    usupwd: z.string({ required_error: 'The password is required' }),
})

export function validateGetCoursesByEducativeCenter(input) {
    return getCoursesByEducativeCenterSchema.safeParse(input)
}

export function validateCreateStudent(input) {
    return createStudentSchema.safeParse(input)
}
