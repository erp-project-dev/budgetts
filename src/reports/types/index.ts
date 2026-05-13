import type { CurrencyCode } from "@/shared/types/currency";

export interface MonthlyReportItem {
  year: number;
  month: string;
  expense: number;
  budget: number;
  currency: CurrencyCode;
}
