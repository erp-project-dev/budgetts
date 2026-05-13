import { Pencil, Trash2 } from "lucide-react";

import { getExpenseCategoryLabel } from "@/shared/constants/expense-categories";
import { formatCurrency } from "@/shared/utils/currency-format";

import type { Expense } from "../types";

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  return (
    <li className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-0 active:bg-stone-50/50 transition-colors">
      <div className="flex flex-col items-center justify-center min-w-11 h-11 bg-stone-50 rounded-xl border border-stone-100">
        <span className="text-xs font-black text-stone-400 uppercase leading-none">
          {new Date(expense.date)
            .toLocaleDateString("es", { month: "short" })
            .replace(".", "")}
        </span>
        <span className="text-sm font-black text-stone-900 leading-none mt-1">
          {new Date(expense.date).getDate()}
        </span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-stone-900 tracking-tight tabular-nums">
            {formatCurrency(expense.amount, expense.currency)}
          </span>
          <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest truncate">
            {getExpenseCategoryLabel(expense.categoryId)}
          </span>
        </div>

        {expense.description ? (
          <p className="text-xs font-medium text-stone-500 truncate mt-0.5">
            {expense.description}
          </p>
        ) : (
          <p className="text-[10px] italic text-stone-300 mt-0.5">
            Sin descripción
          </p>
        )}
      </div>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => onEdit(expense)}
          className="p-2 text-stone-400 hover:text-cyan-600 active:scale-90 transition-all"
        >
          <Pencil size={16} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(expense.id)}
          className="p-2 text-stone-300 hover:text-red-500 active:scale-90 transition-all"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      </div>
    </li>
  );
}
