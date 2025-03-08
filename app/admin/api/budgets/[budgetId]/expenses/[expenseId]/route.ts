import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"

export async function GET(request: Request, { params }: { params: { budgetId: string, expenseId: string } }) {
  await verifySession()
  const token = getToken();

  const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`;
  const req = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
  const json = await req.json();

  if (!req.ok) {
    return Response.json(json, { status: 403 });
  }

  return Response.json(json)
}