import path from 'path'
import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  email: z.string().min(1, { message: 'El email es requerido' }).email({ message: 'El email no es válido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation']
})



export const SuccessSchema = z.string()
export const ErrorResponseSchema = z.string()
export const TokenSchema = z.string().length(6, { message: 'Token inválido' })


export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
  password: z.string()
    .min(1, { message: 'El Password no puede ir vacio' })
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

export type User = z.infer<typeof UserSchema>

export const ForgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
})

export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Los Passwords no son iguales",
  path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
  name: z.string()
    .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce.
    number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
})

export const ExpenseAPIResponseEschema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number()
})

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseEschema)
})


export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({ expenses: true }));

export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseEschema>

export const PasswordValidationSchema = z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: 'El Nombre del gasto es obligatorio' }),
  amount: z.coerce.number().min(1, { message: 'Cantidad no válida' })
})


export type DraftExpense = z.infer<typeof DraftExpenseSchema>