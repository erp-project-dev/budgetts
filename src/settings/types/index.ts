import type { CurrencyCode } from "@/shared/types/currency";

export interface Setting {
  userId: string;
  monthlyLimit: number;
  currencyCode: CurrencyCode;
}
