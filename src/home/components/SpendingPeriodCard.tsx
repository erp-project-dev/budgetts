import type { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

import type { BudgetStatus, PeriodInsights } from "../utils/dashboard-insights";

interface SpendingPeriodCardProps {
  insights: PeriodInsights;
  quartile: BudgetStatus["quartile"];
  currency: CurrencyCode;
}

export function SpendingPeriodCard({
  insights,
  quartile,
  currency,
}: SpendingPeriodCardProps) {
  const hasSpending = insights.total > 0;
  const max = Math.max(1, ...insights.series.map((point) => point.amount));
  const accentTextClass = !hasSpending
    ? "text-stone-700"
    : quartile === 4
      ? "text-red-500"
      : quartile === 3
        ? "text-amber-600"
        : "text-sky-700";
  const accentBarClass =
    quartile === 4
      ? "bg-red-400"
      : quartile === 3
        ? "bg-amber-300"
        : "bg-sky-700";

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        <dl className="divide-y divide-stone-200">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
            <dt className="text-sm font-medium text-stone-500">Gastado</dt>
            <dd
              className={["text-sm font-semibold", accentTextClass].join(" ")}
            >
              {formatCurrency(insights.total, currency)}
            </dd>
          </div>
        </dl>
      </div>

      {insights.total <= 0 ? (
        <p className="mt-2 text-sm text-stone-500">
          No hay gastos registrados en este período.
        </p>
      ) : (
        <div className="rounded-lg border border-stone-200 bg-white px-4 py-4">
          <ul className="m-0 flex list-none flex-col gap-3 p-0" role="list">
            {insights.series.map((point) => (
              <li
                key={point.key}
                className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 text-sm"
              >
                <span className="font-medium uppercase tracking-[0.08em] text-stone-500">
                  {point.label}
                </span>
                <div
                  className="h-2.5 overflow-hidden rounded-full border border-stone-200 bg-stone-100"
                  role="presentation"
                  aria-label={`${point.label}: ${formatCurrency(point.amount, currency)}`}
                >
                  <div
                    className={["h-full rounded-full", accentBarClass].join(
                      " ",
                    )}
                    style={{ width: `${(point.amount / max) * 100}%` }}
                  />
                </div>
                <span
                  className={[
                    "min-w-16 text-right font-mono text-xs",
                    point.amount > 0 ? accentTextClass : "text-stone-700",
                  ].join(" ")}
                >
                  {formatCurrency(point.amount, currency)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
