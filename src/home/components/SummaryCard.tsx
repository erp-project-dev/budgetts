import type { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

import type { BudgetStatus } from "../utils/dashboard-insights";

interface SummaryCardProps {
  summary: BudgetStatus;
  currency: CurrencyCode;
}

export function SummaryCard({ summary, currency }: SummaryCardProps) {
  const progressToneClass =
    summary.quartile === 4
      ? "bg-red-400"
      : summary.quartile === 3
        ? "bg-amber-300"
        : "bg-sky-700";

  const rows = [
    {
      label: "Presupuesto",
      value: formatCurrency(summary.estimatedBudget, currency),
      tone: "text-sky-700",
    },
    {
      label: "Disponible",
      value: formatCurrency(summary.remainingBudget, currency),
      tone: summary.remainingBudget < 0 ? "text-red-500" : "text-emerald-700",
    },
    {
      label: "Gastado",
      value: formatCurrency(summary.spentInPeriod, currency),
      tone:
        summary.quartile === 4
          ? "text-red-500"
          : summary.quartile === 3
            ? "text-amber-600"
            : "text-stone-700",
    },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        <dl className="divide-y divide-stone-200">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3"
            >
              <dt className="text-sm font-medium text-stone-500">
                {row.label}
              </dt>
              <dd className={["text-sm font-semibold", row.tone].join(" ")}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <div
          className="h-2.5 overflow-hidden rounded-full border border-stone-200 bg-stone-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={summary.progress}
          aria-label="Progreso del gasto del período"
        >
          <div
            className={["h-full rounded-full", progressToneClass].join(" ")}
            style={{ width: `${summary.progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-stone-500">
          {formatCurrency(summary.spentInPeriod, currency)} usados de{" "}
          {formatCurrency(summary.estimatedBudget, currency)} en el período
          activo.
        </p>
      </div>
    </>
  );
}
