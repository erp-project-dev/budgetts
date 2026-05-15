import { Injectable } from "@/core/decorators/injectable.decorator";

import { getCurrentPeriod } from "@/shared/utils/date";

import { ExpenseRepository } from "@/expenses/repositories/expense.repository";
import { SettingRepository } from "@/settings/repositories/setting.repository";

import { BudgetRepository } from "../repositories/budget.repository";
import { Budget } from "../types";

@Injectable("budgetService")
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

  async getCurrentBudget(userId: string): Promise<Budget> {
    const period = getCurrentPeriod();

    const { monthlyLimit: amount, currencyCode: currency } =
      await this.settingRepository.get(userId);

    const spent = await this.expenseRepository.getTotalSpentForPeriod(
      userId,
      period,
    );

    return {
      amount,
      currency,
      period,
      spent,
      userId,
    };
  }

  async ensureCurrentMonthBudget(userId: string): Promise<void> {
    const settings = await this.settingRepository.get(userId);
    const totalSpent = await this.expenseRepository.getTotalSpentForPeriod(
      userId,
      getCurrentPeriod(),
    );

    await this.budgetRepository.ensureMonthlySnapshot({
      amount: settings?.monthlyLimit ?? 0,
      userId,
      period: getCurrentPeriod(),
      spent: totalSpent,
      currency: settings?.currencyCode,
    });
  }
}
