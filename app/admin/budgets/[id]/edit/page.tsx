import getToken from "@/src/auth/token";
import { BudgetAPIResponseSchema } from "@/src/schemas";
import { notFound } from "next/navigation";

const getBudget = async (budgetId: string) => {
  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const token = getToken();
  const req = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const json = await req.json();

  if (!req.ok) {
    notFound()
  }

  const budget = BudgetAPIResponseSchema.parse(json);
  return budget;

}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {

  const { id } = params;

  const budget = await getBudget(id);
  console.log(budget)

  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>Edit Budget Page</h1>

    </div>
  );
}
