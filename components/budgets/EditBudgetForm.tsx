'use client'
import { createBudget } from "@/actions/create-budget-action"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom"
import { toast } from "react-toastify";
import BudgetForm from "./BudgetForm";
import { Budget } from "@/src/schemas";
import { editBudget } from "@/actions/edit-budget-action";

export default function EditBudgetForm({ budget }: { budget: Budget }) {

  const router = useRouter();

  const budgetId = budget.id;

  const editBudgetWithId = editBudget.bind(null, budgetId)
  const [state, dispatch] = useFormState(editBudgetWithId, {
    errors: [],
    success: ''
  });


  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => toast.error(error));
    }

    if (state.success) {
      router.push('/admin');
      toast.success(state.success);
    }
  }, [state])


  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
      <BudgetForm budget={budget} />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Guardar Cambios'
      />
    </form>
  )
}