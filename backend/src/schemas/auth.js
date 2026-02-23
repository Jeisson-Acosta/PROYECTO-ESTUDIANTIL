import z from 'zod'

const registerSchema = z.object({
    usunom: z.string({ required_error: 'The username is required' }),
    usuemail: z.email({ required_error: 'The email is required' }),
    usupwd: z.string({ required_error: 'The password is required' }),
    usudocu: z.string({ required_error: 'The document is required' }),
    usucel: z.string({ required_error: 'The cell phone is required' }),
    usufch_nacimiento: z.iso.date({ required_error: 'The birth date is required' }),
    ceeid: z.number({ required_error: 'The ceeid is required' }),
    rolid: z.number({ required_error: 'The role is required' }),
    tidid: z.number({ required_error: 'The type of document is required' })
})

const loginSchema = z.object({
    usuemail: z.email({ required_error: 'The email is required' }),
    usupwd: z.string({ required_error: 'The password is required' })
})

// Esta función nos permite validar que al registrarse no lleguen datos inesperados.
export function validateRegister(data) {
    return registerSchema.safeParse(data)
}

// Esta función nos permite validar que al iniciar sesión no lleguen datos inesperados.
export function validateLogin(data) {
    return loginSchema.safeParse(data)
}