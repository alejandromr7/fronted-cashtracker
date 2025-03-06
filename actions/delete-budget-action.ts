'use server'

import ErrorMessage from "@/components/ui/ErrorMessage";
import getToken from "@/src/auth/token";
import { Budget, ErrorResponseSchema, PasswordValidationSchema, SuccessSchema } from "@/src/schemas";
import { form } from "framer-motion/client";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[],
  success: string
}

export async function deleteBudget(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {

  const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'));

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: ''
    }
  }

  // Comprobar Password //
  const token = getToken();
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`;
  const checkPasswordReq = await fetch(checkPasswordUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ password: currentPassword.data }),
  });
  const checkPasswordJson = await checkPasswordReq.json();

  if (!checkPasswordReq.ok) {
    // const error = ErrorResponseSchema.safeParse(checkPasswordJson);
    // console.log(error)
    return {
      errors: ['Contraseña incorrecta'],
      success: ''
    }
  }


  // Eliminar Presupuesto //
  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`;
  const deleteBudgetReq = await fetch(deleteBudgetUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const deleteBudgetJson = await deleteBudgetReq.json();

  if (!deleteBudgetReq.ok) {
    const error = ErrorResponseSchema.safeParse(deleteBudgetJson);
    console.log(error)
    return {
      errors: [error.data],
      success: ''
    }
  }

  revalidatePath('/budgets')
  const success = SuccessSchema.parse(deleteBudgetJson);
  console.log(success);

  return {
    errors: [],
    success
  }
}
