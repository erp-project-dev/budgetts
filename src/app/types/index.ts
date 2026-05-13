import type { AuthService } from "@/auth/services/auth.service";
import type { BudgetService } from "@/budgets/services/budget.service";
import type { ExpenseService } from "@/expenses/services/expense.service";
import type { ReportService } from "@/reports/services/report.service";
import type { SettingService } from "@/settings/services/setting.service";

export interface AppContextValue {
  loading: boolean;
  session: { id: string; name: string } | null;
  services: {
    authService: AuthService;
    expenseService: ExpenseService;
    reportService: ReportService;
    settingService: SettingService;
    budgetService: BudgetService;
  };
}

export interface AppRouter {
  component: React.ComponentType;
  path: string;
  name: string;
  isPublic?: boolean;
  order?: number;
}
