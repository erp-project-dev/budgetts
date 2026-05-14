import type { ExpenseCategoryId } from "@/shared/constants/expense-categories";
import type { CurrencyCode } from "@/shared/types/currency";

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  categoryId: ExpenseCategoryId;
  description?: string;
  date: Date;
  currency: CurrencyCode;
}

export interface NewExpenseInput {
  userId: string;
  amount: number;
  categoryId: string;
  description?: string;
  date: Date;
  currency: CurrencyCode;
}

export interface UpdateExpenseInput {
  id: string;
  userId: string;
  amount: number;
  categoryId: string;
  description?: string;
}

export interface ExpenseTemplate {
  label: string;
  categoryId: ExpenseCategoryId;
  amount?: number;
  keywords: string[];
}
