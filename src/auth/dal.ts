import 'server-only'
import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import { UserSchema } from "../schemas";
import { cache } from "react";


export const verifySession = cache(async () => {
  const token = cookies().get('token')?.value;

  if (!token) redirect('/auth/login');

  const req = await fetch(`${process.env.API_URL}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  const session = await req.json();
  const result = UserSchema.safeParse(session);

  if (!result.success) redirect('/auth/login');

  return {
    user: result.data,
    isAuth: true
  }
}
)

