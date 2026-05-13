import type { CurrencyCode } from "@/shared/types/currency";

export interface Budget {
  userId: string;
  amount: number;
  period: string;
  spent: number;
  currency: CurrencyCode;
}
