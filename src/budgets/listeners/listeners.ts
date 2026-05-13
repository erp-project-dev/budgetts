import { eventBus } from "@/core/events/event-bus";
import { Logger } from "@/core/logger";

import { BUDGET_TOPICS } from "./index";
import type { BudgetService } from "../services/budget.service";

export function registerListeners({
  budgetService,
}: {
  budgetService: BudgetService;
}): void {
  eventBus.on(BUDGET_TOPICS.BUDGET_CHANGED, async (userId) => {
    Logger.info(
      `Budget changed for user ${userId}, ensuring current month budget exists...`,
    );

    await budgetService.ensureCurrentMonthBudget(userId);
  });
}
