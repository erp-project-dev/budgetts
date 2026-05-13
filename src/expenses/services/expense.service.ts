import { eventBus } from "@/core/events/event-bus";

import { BUDGET_TOPICS } from "@/budgets/listeners";

import { ExpenseRepository } from "../repositories/expense.repository";
import type { Expense, NewExpenseInput, UpdateExpenseInput } from "../types";

export class ExpenseService {
  private readonly repository: ExpenseRepository;

  constructor({ expenseRepository }: { expenseRepository: ExpenseRepository }) {
    this.repository = expenseRepository;
  }

  listByUser(userId: string): Promise<Expense[]> {
    return this.repository.listByUser(userId);
  }

  async create(input: NewExpenseInput): Promise<Expense> {
    const expense = await this.repository.create(input);
    void eventBus.emit(BUDGET_TOPICS.BUDGET_CHANGED, input.userId);

    return expense;
  }

  async update(input: UpdateExpenseInput): Promise<Expense> {
    const expense = await this.repository.update(input);
    void eventBus.emit(BUDGET_TOPICS.BUDGET_CHANGED, input.userId);

    return expense;
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.repository.remove(userId, id);
    void eventBus.emit(BUDGET_TOPICS.BUDGET_CHANGED, userId);
  }
}
