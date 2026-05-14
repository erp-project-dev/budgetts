import { useCallback, useEffect, useState } from "react";

import { eventBus } from "@/core/events/event-bus";
import { Logger } from "@/core/logger";

import { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

import { useSignedInApp } from "@/app/hooks/useApp";
import { BUDGET_TOPICS } from "@/budgets/listeners";
import { BudgetService } from "@/budgets/services/budget.service";

export function AppHeaderBudget() {
  const { useServices, session } = useSignedInApp();
  const [budgetService] = useServices<[BudgetService]>("budgetService");

  const [spent, setSpent] = useState(0);
  const [limit, setLimit] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode>("PEN");

  const [isLoading, setIsLoading] = useState(true);

  const getStatusColor = () => {
    if (limit === 0) return "text-emerald-400";
    const percentage = (spent / limit) * 100;

    if (percentage < 25) return "text-emerald-400";
    if (percentage < 50) return "text-yellow-400";
    if (percentage < 75) return "text-orange-400";

    return "text-red-400";
  };

  const statusColor = getStatusColor();

  const refreshBudget = useCallback(
    async (firstTrigger = false) => {
      if (firstTrigger) {
        setIsLoading(true);
      }

      try {
        const budget = await budgetService.getCurrentBudget(session.id);

        if (budget) {
          setSpent(budget.spent);
          setLimit(budget.amount);
          setCurrency(budget.currency);
        }
      } finally {
        if (firstTrigger) {
          setIsLoading(false);
        }
      }
    },
    [budgetService, session.id],
  );

  useEffect(() => {
    (async () => {
      await refreshBudget(true);
    })();
  }, [refreshBudget]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      BUDGET_TOPICS.BUDGET_UI_REFRESH,
      async () => {
        Logger.info(
          `Updating user:${session.id} budget for AppHeaderBudget component`,
        );

        await refreshBudget();
      },
    );
    return () => unsubscribe();
  }, [refreshBudget, session.id]);

  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-sm leading-none tracking-tight transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
    >
      <span
        className={`font-normal ${statusColor} ${isLoading ? "animate-pulse" : ""}`}
      >
        {isLoading ? "---" : formatCurrency(spent, currency, 0)}
      </span>

      <span className="text-zinc-200">/</span>

      <span
        className={`font-bold text-zinc-300 ${isLoading ? "animate-pulse" : ""}`}
      >
        {isLoading ? "---" : formatCurrency(limit, currency, 0)}
      </span>
    </div>
  );
}
