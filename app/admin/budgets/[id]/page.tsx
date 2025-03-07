import AddExpenseButton from '@/components/expenses/AddExpenseButton';
import ExpenseMenu from '@/components/expenses/ExpenseMenu';
import ModalContainer from '@/components/ui/ModalContainer';
import { getBudget } from '@/src/services/budget';
import { formatCurrency, formatDay } from '@/src/utils';
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const budget = await getBudget(params.id);
  return {
    title: `Cashtracker: ${budget.name}`,
    description: `Cashtracker: ${budget.name}`
  };
}

export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const budget = await getBudget(id);


  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
        </div>

        <AddExpenseButton />
      </div>

      {budget.expenses.length > 0 ? (
        <>
          <h1 className="font-black text-4xl text-purple-950 mt-10">Gastos en este presupuesto</h1>

          <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(+expense.amount)}
                    </p>
                    <p className='text-gray-500  text-sm'>
                      {formatDay(expense.updatedAt)}
                    </p>
                  </div>
                </div>
                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='text-center py-20'>No hay</p>
      )}

      <ModalContainer />
    </>
  );
}
