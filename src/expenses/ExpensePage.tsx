import { useEffect, useState } from "react";

import { eventBus } from "@/core/events/event-bus";
import { Logger } from "@/core/logger";

import { Section } from "@/shared/components/blocks/Section";
import { SkeletonWrapper } from "@/shared/components/blocks/SkeletonWrapper";
import { Button } from "@/shared/components/form/Button";

import { useSignedInApp } from "@/app/hooks/useApp";
import { BUDGET_TOPICS } from "@/budgets/listeners";

import { AddExpenseModal } from "./components/AddExpenseModal";
import { ExpenseItem } from "./components/ExpenseItem";
import { ExpenseService } from "./services/expense.service";
import type { Expense } from "./types";

export function ExpensePage() {
  const { session, useServices } = useSignedInApp();
  const [expenseService] = useServices<[ExpenseService]>("expenseService");

  const [items, setItems] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const data = await expenseService.listByUser(session.id);
        if (!cancelled) setItems(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchExpenses();
    return () => {
      cancelled = true;
    };
  }, [session?.id, expenseService]);

  const remove = async (id: string) => {
    try {
      await expenseService.remove(session.id, id);
      setItems((prev) => prev.filter((item) => item.id !== id));

      eventBus.emit(BUDGET_TOPICS.BUDGET_UI_REFRESH);
    } catch (error) {
      Logger.error("Error deleting expense:", error);
    }
  };

  const handleSuccess = (expense: Expense) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === expense.id);
      if (exists) {
        return prev.map((i) => (i.id === expense.id ? expense : i));
      }
      return [expense, ...prev];
    });
  };

  if (loading) {
    return (
      <SkeletonWrapper>
        <div className="h-3 w-32 rounded bg-stone-200" />
        <div className="h-8 w-52 rounded bg-stone-300" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-[1.4rem] bg-stone-100" />
          ))}
        </div>
      </SkeletonWrapper>
    );
  }

  const sortedItems = [...items].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  const visibleItems = sortedItems.slice(0, limit);
  const hasMore = items.length > limit;
  const isEmpty = items.length === 0;

  return (
    <>
      <Section
        title="Registro de gastos"
        description="Movimientos recientes"
        footer={
          hasMore && !isEmpty ? (
            <Button
              type="button"
              fullWidth
              variant="outline"
              onClick={() => setLimit((prev) => prev + 20)}
            >
              Mostrar 20 más
            </Button>
          ) : undefined
        }
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-stone-200 rounded-4xl text-center">
            <p className="text-stone-500 font-medium">
              No se encontraron registros
            </p>
            <p className="text-stone-400 text-sm">
              Empieza agregando tu primer gasto del mes.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {visibleItems.map((item) => (
              <ExpenseItem
                key={item.id}
                expense={item}
                onEdit={setEditingExpense}
                onDelete={remove}
              />
            ))}
          </ul>
        )}
      </Section>

      {editingExpense?.id && (
        <AddExpenseModal
          key={editingExpense?.id}
          open={Boolean(editingExpense)}
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSuccess={(editedExpense) => handleSuccess(editedExpense!)}
        />
      )}
    </>
  );
}
