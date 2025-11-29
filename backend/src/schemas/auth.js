import z from 'zod'

const registerSchema = z.object({
    usunom: z.string({ required_error: 'The username is required' }),
    usuemail: z.email({ required_error: 'The email is required' }),
    usupwd: z.string({ required_error: 'The password is required' }),
    usudocu: z.string({ required_error: 'The document is required' }),
    usucel: z.string({ required_error: 'The cell phone is required' }),
    rolid: z.number({ required_error: 'The role is required' }),
    tidid: z.number({ required_error: 'The type of document is required' })
})

// Esta función nos permite validar que al registrarse no lleguen datos inesperados.
export function validateRegister(data) {
    return registerSchema.safeParse(data)
}