'use server'

import { ErrorResponseSchema, LoginSchema, SuccessSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionstateType = {
  errors: string[],
  success: string
}

export async function authenticate(prevState: ActionstateType, formdata: FormData) {

  const loginCredentials = {
    email: formdata.get('email'),
    password: formdata.get('password'),
  }

  const auth = LoginSchema.safeParse(loginCredentials);

  if (!auth.success) {
    return {
      errors: auth.error.issues.map((issue) => issue.message),
      success: '',
    }
  }


  const url = `${process.env.API_URL}/auth/login`;

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(auth.data),
  })
  const json = await req.json()

  if (!req.ok) {
    const error = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: '',
    }
  }

  const success = SuccessSchema.parse(json);

  cookies().set({
    name: 'token',
    value: success,
    httpOnly: true,
    path: '/',
  })

  return {
    errors: [],
    success
  }

}