import z from 'zod'

const getCoursesByEducativeCenterSchema = z.object({
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val)),
    cecid: z.string({ required_error: 'The educative center code is required' }).transform(val => Number(val)),
    usuid: z.string({ required_error: 'The user id is required' }).transform(val => Number(val)),
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

const createAsignatura = z.object({
    usuid: z.string({ required_error: 'The user id is required' }).transform(val => Number(val)),
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val)),
    cecid: z.string({ required_error: 'The educative center code is required' }).transform(val => Number(val)),
    info_asignatura: z.object({
        asgnom: z.string({ required_error: 'The asignatura name is required' }),
        asgcod: z.string({ required_error: 'The asignatura code is required' }),
        asgcod_clase: z.string({ required_error: 'The asignatura class code is required' }),
        edcid: z.string({ required_error: 'The edcid is required' }).transform(val => Number(val)),
        cesid: z.string({ required_error: 'The cesid is required' }).transform(val => Number(val)),
        docente_id: z.string({ required_error: 'The docente id is required' }).transform(val => Number(val)),
        asgmaxest: z.string({ required_error: 'The max students is required' }).transform(val => Number(val)),
        asgestado: z.string({ required_error: 'The status is required' }),
        ascvis_config: z.object({
            color: z.string(),
            iconName: z.string(),
            backgroundName: z.string()
        })
    })
})

const getAllAsignaturesInfo = z.object({
    usuid: z.string({ required_error: 'The user id is required' }).transform(val => Number(val)),
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val)),
    cecid: z.string({ required_error: 'The educative center code is required' }).transform(val => Number(val))
})

const getInfoToCreateAsignature = z.object({
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val))
})

const getAllDocents = z.object({
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val))
})

const createCourse = z.object({
    usuid: z.string({ required_error: 'The user id is required' }).transform(val => Number(val)),
    cedid: z.string({ required_error: 'The id is required' }).transform(val => Number(val)),
    cecid: z.string({ required_error: 'The educative center code is required' }).transform(val => Number(val)),
    edccod: z.string({ required_error: 'The educative course code is required' }), 
    edcnom: z.string({ required_error: 'The educative course name is required' }),
    usuid_docente: z.string({ required_error: 'The docente id is required' }).transform(val => Number(val))
    
})

export function validateGetCoursesByEducativeCenter(input) {
    return getCoursesByEducativeCenterSchema.safeParse(input)
}

export function validateCreateStudent(input) {
    return createStudentSchema.safeParse(input)
}

export function validateGetInfoToCreateAsignature(input) {
    return getInfoToCreateAsignature.safeParse(input)
}

export function validateCreateAsignatura(input) {
    return createAsignatura.safeParse(input)
}

export function validateGetAllAsignaturesInfo(input) {
    return getAllAsignaturesInfo.safeParse(input)
}

export function validateGetAllDocents(input) {
    return getAllDocents.safeParse(input)
}

export function validateCreateCourse(input) {
    return createCourse.safeParse(input)
}
