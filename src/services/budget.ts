import { cache } from "react";
import getToken from "../auth/token";
import { notFound } from "next/navigation";
import { BudgetAPIResponseSchema } from "../schemas";



export const getBudget = cache(
  async (budgetId: string) => {
    const url = `${process.env.API_URL}/budgets/${budgetId}`;
    const token = getToken();
    const req = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: {
        tags: ['all-budgets'],
      }
    });
    const json = await req.json();

    if (!req.ok) {
      notFound()
    }

    const budget = BudgetAPIResponseSchema.parse(json);
    return budget;

  }
)
