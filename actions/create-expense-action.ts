'use server'

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: string[],
  success: string
}

export default async function createExpense(budgetId: Budget['id'], prevSate: ActionStateType, formData: FormData) {

  const expenseData = {
    name: formData.get('name'),
    amount: formData.get('amount')
  }

  const expense = DraftExpenseSchema.safeParse(expenseData);

  if (!expense.success) {
    return {
      errors: expense.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = getToken();

  // TODO: Create expense in the backend with budgetId and expense data
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount
    })
  });

  const json = await req.json();

  if (!req.ok) {
    const error = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: ''
    }
  }

  revalidatePath(`/budgets/${budgetId}`)
  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success
  }
}