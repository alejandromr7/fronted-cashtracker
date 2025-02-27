'use server'

import { ErrorResponseSchema, ResetPasswordSchema } from "@/src/schemas";


type ActionFormType = {
  errors: string[],
  success: string
}

export async function resetPassword(token: string, prevState: ActionFormType, formData: FormData) {

  const resetPasswordData = {
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  };

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordData);

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: ''
    }
  }

  // TODO: Send email with reset password link
  const url = `${process.env.API_URL}/auth/reset-password/${token}`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: resetPasswordData.password,
    }),
  })

  const json = await req.json()
  if (!req.ok) {
    const error = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: '',
    }
  }



  return {
    errors: [],
    success: 'Se ha enviado un email para reiniciar tu contraseña'
  }
}