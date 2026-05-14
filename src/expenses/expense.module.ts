import type { FeatureModule } from "@/core/modules/types";

import { ExpenseRepository } from "@/expenses/repositories/expense.repository";
import { ExpenseRouter } from "@/expenses/router";
import { ExpenseService } from "@/expenses/services/expense.service";

export const expenseModule: FeatureModule = {
  name: "expenses",
  routes: ExpenseRouter,
  repositories: [ExpenseRepository],
  services: [ExpenseService],
};
