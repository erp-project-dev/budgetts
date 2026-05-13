import type { CurrencyCode } from "../types/currency";

const cache = new Map<string, Intl.NumberFormat>();

function getFormatter(currency: string): Intl.NumberFormat {
  const existing = cache.get(currency);
  if (existing) return existing;
  const locale = currency === "PEN" ? "es-PE" : "en-US";
  const fmt = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  cache.set(currency, fmt);
  return fmt;
}

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
): string {
  return getFormatter(currencyCode).format(amount);
}
