'use server'

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[],
  success: string
}

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  const register = RegisterSchema.safeParse(registerData);

  if (!register.success) {
    return {
      errors: register.error.issues.map((issue) => issue.message),
      success: '',
    }
  }

  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password,
      password_confirmation: register.data.password_confirmation
    }),
  })

  const json = await req.json()

  if (req.status === 400) {
    const error = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: '',
    }
  }

  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success
  }
}