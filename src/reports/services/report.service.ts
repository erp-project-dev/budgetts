import { BudgetRepository } from "@/budgets/repositories/budget.repository";

import type { MonthlyReportItem } from "../types";

export class ReportService {
  private readonly budgetRepository: BudgetRepository;

  constructor({ budgetRepository }: { budgetRepository: BudgetRepository }) {
    this.budgetRepository = budgetRepository;
  }

  async getMonthlyReport(userId: string): Promise<MonthlyReportItem[]> {
    const budgets = await this.budgetRepository.listByUser(userId);

    return budgets.map((b) => {
      const [yearStr, monthStr] = b.period.split("-");

      return {
        year: parseInt(yearStr),
        month: monthStr,
        budget: b.amount,
        expense: b.spent || 0,
        currency: b.currency,
      };
    });
  }
}
