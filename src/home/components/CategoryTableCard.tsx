import type { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

import type { PeriodInsights } from "../utils/dashboard-insights";

interface CategoryTableCardProps {
  insights: PeriodInsights;
  currency: CurrencyCode;
}

export function CategoryTableCard({
  insights,
  currency,
}: CategoryTableCardProps) {
  if (insights.categories.length === 0) {
    return (
      <p className="text-sm text-stone-500">
        No hay categorías con gasto en este período.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
      <table className="min-w-full divide-y divide-stone-200 text-sm">
        <thead className="bg-stone-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-stone-500">
              Categoría
            </th>
            <th className="px-4 py-2 text-right font-semibold text-stone-500">
              Monto
            </th>
          </tr>
        </thead>
        <tbody>
          {insights.categories.map((category) => (
            <tr
              key={category.categoryId}
              className="even:bg-white odd:bg-stone-100"
            >
              <td className="px-4 py-2 text-stone-800">{category.label}</td>
              <td className="px-4 py-2 text-right font-mono font-bold text-sky-700">
                {formatCurrency(category.amount, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
