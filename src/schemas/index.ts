import { z } from 'zod'

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }),
    password: z.string().min(8, { message: 'The password must be great than 8' }),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: 'Los password no son iguales',
    path: ['password_confirmation']
})

