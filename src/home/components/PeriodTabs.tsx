import {
  DASHBOARD_PERIOD_OPTIONS,
  type DashboardPeriod,
} from "../utils/dashboard-insights";

interface PeriodTabsProps {
  value: DashboardPeriod;
  onChange: (value: DashboardPeriod) => void;
}

export function PeriodTabs({ value, onChange }: PeriodTabsProps) {
  return (
    <div
      className="grid w-full grid-cols-3 overflow-hidden rounded-lg border border-stone-200 bg-stone-100 p-1"
      role="tablist"
      aria-label="Filtro de período"
    >
      {DASHBOARD_PERIOD_OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[
              "inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition",
              isActive
                ? "bg-white text-stone-900 shadow-sm shadow-stone-900/5"
                : "text-stone-600 hover:bg-stone-200",
            ].join(" ")}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
