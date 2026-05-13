import type { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

type HeaderProps = {
  periodLabel: string;
  monthTotal: number;
  monthlyLimit: number;
  currency: CurrencyCode;
};

export function Header({
  periodLabel,
  monthTotal,
  monthlyLimit,
  currency,
}: HeaderProps) {
  return (
    <header className="relative w-full px-4 pt-6 pb-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-50/40 rounded-full blur-3xl" />
      </div>

      <div className="relative flex gap-4 items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-cyan-600 rounded-full" />
          <div className="flex flex-col">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
              Periodo
            </p>
            <h1 className="text-2xl font-black tracking-tighter text-stone-900 capitalize leading-none">
              {periodLabel}
            </h1>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-stone-400 mb-0.5">
            Gastado Total
          </p>
          <div>
            <div className="text-2xl font-black text-stone-900 tabular-nums leading-none">
              {formatCurrency(monthTotal, currency)}
            </div>
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-tight mt-1">
              Límite: {formatCurrency(monthlyLimit, currency)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
