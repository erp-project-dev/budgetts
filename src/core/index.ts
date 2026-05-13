import { authModule } from "@/auth/auth.module";
import { budgetModule } from "@/budgets/budget.module";
import { expenseModule } from "@/expenses/expense.module";
import { homeModule } from "@/home/home.module";
import { loginModule } from "@/login/login.module";
import { reportModule } from "@/reports/report.module";
import { settingModule } from "@/settings/setting.module";

import { buildAppFromModules } from "./modules/builder";
import type { FeatureModule } from "./modules/types";

export const featureModules: readonly FeatureModule[] = [
  authModule,
  loginModule,
  homeModule,
  expenseModule,
  settingModule,
  budgetModule,
  reportModule,
];

export const appRegistry = buildAppFromModules(featureModules);
