import { ExpenseRepository } from "@/expenses/repositories/expense.repository";
import { SettingRepository } from "@/settings/repositories/setting.repository";

import { BudgetRepository } from "../repositories/budget.repository";

export class BudgetService {
  private readonly budgetRepository: BudgetRepository;
  private readonly settingRepository: SettingRepository;
  private readonly expenseRepository: ExpenseRepository;

  constructor({
    budgetRepository,
    settingRepository,
    expenseRepository,
  }: {
    budgetRepository: BudgetRepository;
    settingRepository: SettingRepository;
    expenseRepository: ExpenseRepository;
  }) {
    this.budgetRepository = budgetRepository;
    this.settingRepository = settingRepository;
    this.expenseRepository = expenseRepository;
  }

  getCurrentPeriod(): string {
    return this.budgetRepository.getCurrentPeriod();
  }

  async ensureCurrentMonthBudget(userId: string): Promise<void> {
    const settings = await this.settingRepository.get(userId);
    const totalSpent = await this.expenseRepository.getTotalSpentForPeriod(
      userId,
      this.getCurrentPeriod(),
    );

    await this.budgetRepository.ensureMonthlySnapshot({
      amount: settings?.monthlyLimit ?? 0,
      userId,
      period: this.getCurrentPeriod(),
      spent: totalSpent,
      currency: settings?.currencyCode,
    });
  }
}
