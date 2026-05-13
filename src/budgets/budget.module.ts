import type { FeatureModule } from "@/core/modules/types";

import { BudgetRepository } from "@/budgets/repositories/budget.repository";
import { BudgetService } from "@/budgets/services/budget.service";
import { ExpenseRepository } from "@/expenses/repositories/expense.repository";
import { SettingRepository } from "@/settings/repositories/setting.repository";

import { registerListeners } from "./listeners/listeners";

export const budgetModule: FeatureModule = {
  name: "budgets",
  repositories: [BudgetRepository, SettingRepository, ExpenseRepository],
  services: [BudgetService],
  listeners: registerListeners,
};
