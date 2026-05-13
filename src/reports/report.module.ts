import type { FeatureModule } from "@/core/modules/types";

import { BudgetRepository } from "@/budgets/repositories/budget.repository";
import { ReportRouter } from "@/reports/router";
import { ReportService } from "@/reports/services/report.service";

export const reportModule: FeatureModule = {
  name: "reports",
  routes: ReportRouter,
  repositories: [{ key: "budgetRepository", repository: BudgetRepository }],
  services: [{ key: "reportService", service: ReportService }],
};
