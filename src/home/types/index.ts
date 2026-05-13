import type { CurrencyCode } from "@/shared/types/currency";

import type { Expense } from "@/expenses/types";

export type SpendingQuartile = 1 | 2 | 3 | 4;

export interface DashboardSummary {
  userId: string;
  monthlyLimit: number;
  spentThisMonth: number;
  availableToday: number;
  daysRemainingInMonth: number;
  quartile: SpendingQuartile;
}

export interface WeeklyAnalysis {
  userId: string;
  weekTotal: number;
  dailyTotals: { dateKey: string; label: string; amount: number }[];
}

export interface HomeContextValue {
  loading: boolean;
  currency: CurrencyCode;
  currentLimit: number;
  expenses: Expense[];
}
