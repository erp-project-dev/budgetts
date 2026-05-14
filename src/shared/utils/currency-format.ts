import type { CurrencyCode } from "../types/currency";

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  round = 2,
): string {
  const locale = currencyCode === "PEN" ? "es-PE" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: round,
    maximumFractionDigits: round,
  }).format(amount);
}
