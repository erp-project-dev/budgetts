import { getExpenseCategoryLabel } from "@/shared/constants/expense-categories";

import type { Expense } from "@/expenses/types";

import type { DashboardSummary, SpendingQuartile } from "../types";

export type DashboardPeriod = "day" | "week" | "month";

export interface SeriesPoint {
  key: string;
  label: string;
  amount: number;
}

export interface CategoryTotal {
  categoryId: string;
  label: string;
  amount: number;
  share: number;
}

export interface PeriodInsights {
  period: DashboardPeriod;
  label: string;
  total: number;
  series: SeriesPoint[];
  categories: CategoryTotal[];
  topCategory: CategoryTotal | null;
}

export interface BudgetStatus {
  period: DashboardPeriod;
  periodLabel: string;
  estimatedBudget: number;
  spentInPeriod: number;
  monthTotal: number;
  remainingBudget: number;
  quartile: SpendingQuartile;
  progress: number;
}

export const DASHBOARD_PERIOD_OPTIONS: Array<{
  value: DashboardPeriod;
  label: string;
}> = [
  { value: "day", label: "Día" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
];

const shortWeekdayFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "short",
});

const shortMonthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "short",
});

const monthYearFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
});

const dayMonthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "short",
  day: "numeric",
});

function getStartOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isWithinSelectedPeriod(
  date: Date,
  period: DashboardPeriod,
  now: Date,
) {
  if (period === "day") return isSameDay(date, now);
  if (period === "week") {
    const start = getStartOfWeek(now);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return date >= start && date < end;
  }
  if (period === "month") return isSameMonth(date, now);
  return date.getFullYear() === now.getFullYear();
}

function normalizeWeekdayLabel(value: string) {
  return value.replace(".", "").slice(0, 3);
}

function getSeriesForDay(items: Expense[], now: Date): SeriesPoint[] {
  return Array.from({ length: 6 }, (_, index) => {
    const startHour = index * 4;
    const amount = items.reduce((sum, item) => {
      if (!isSameDay(item.date, now)) return sum;
      const hour = item.date.getHours();
      if (hour >= startHour && hour < startHour + 4) {
        return sum + item.amount;
      }
      return sum;
    }, 0);

    return {
      key: `day-${startHour}`,
      label: `${String(startHour).padStart(2, "0")}h`,
      amount,
    };
  });
}

function getSeriesForWeek(items: Expense[], now: Date): SeriesPoint[] {
  const start = getStartOfWeek(now);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const amount = items.reduce((sum, item) => {
      return isSameDay(item.date, date) ? sum + item.amount : sum;
    }, 0);

    return {
      key: date.toISOString(),
      label: normalizeWeekdayLabel(shortWeekdayFormatter.format(date)),
      amount,
    };
  });
}

function getSeriesForMonth(items: Expense[], now: Date): SeriesPoint[] {
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const bucketCount = Math.ceil(totalDays / 7);

  return Array.from({ length: bucketCount }, (_, index) => {
    const startDay = index * 7 + 1;
    const endDay = Math.min(totalDays, startDay + 6);
    const amount = items.reduce((sum, item) => {
      if (!isSameMonth(item.date, now)) return sum;
      const day = item.date.getDate();
      if (day >= startDay && day <= endDay) {
        return sum + item.amount;
      }
      return sum;
    }, 0);

    return {
      key: `month-${index + 1}`,
      label: `Sem ${index + 1}`,
      amount,
    };
  });
}

function getSeriesForYear(items: Expense[], now: Date): SeriesPoint[] {
  const year = now.getFullYear();

  return Array.from({ length: 12 }, (_, index) => {
    const amount = items.reduce((sum, item) => {
      if (item.date.getFullYear() !== year) return sum;
      return item.date.getMonth() === index ? sum + item.amount : sum;
    }, 0);

    return {
      key: `year-${index}`,
      label: shortMonthFormatter.format(new Date(year, index, 1)),
      amount,
    };
  });
}

function buildSeries(items: Expense[], period: DashboardPeriod, now: Date) {
  if (period === "day") return getSeriesForDay(items, now);
  if (period === "week") return getSeriesForWeek(items, now);
  if (period === "month") return getSeriesForMonth(items, now);
  return getSeriesForYear(items, now);
}

function buildPeriodLabel(period: DashboardPeriod, now: Date) {
  const capitalize = (value: string) =>
    value.replace(/\p{L}/u, (letter) => letter.toUpperCase());

  if (period === "day") return capitalize(dayMonthFormatter.format(now));
  if (period === "week") {
    const start = getStartOfWeek(now);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${capitalize(dayMonthFormatter.format(start))} - ${capitalize(dayMonthFormatter.format(end))}`;
  }
  if (period === "month") return capitalize(monthYearFormatter.format(now));
  return String(now.getFullYear());
}

function buildCategories(items: Expense[]) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const totals = new Map<string, number>();

  for (const item of items) {
    totals.set(
      item.categoryId,
      (totals.get(item.categoryId) ?? 0) + item.amount,
    );
  }

  return Array.from(totals.entries())
    .map(([categoryId, amount]) => ({
      categoryId,
      label: getExpenseCategoryLabel(categoryId),
      amount,
      share: total > 0 ? amount / total : 0,
    }))
    .sort((left, right) => right.amount - left.amount);
}

function getQuartile(spent: number, limit: number): SpendingQuartile {
  if (limit <= 0) return 1;
  const ratio = spent / limit;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function getDaysInMonth(now: Date) {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

function getEstimatedBudget(
  period: DashboardPeriod,
  monthlyLimit: number,
  now: Date,
) {
  const daysInMonth = getDaysInMonth(now);
  const dailyBudget = daysInMonth > 0 ? monthlyLimit / daysInMonth : 0;

  if (period === "day") return dailyBudget;
  if (period === "week") return dailyBudget * 7;
  if (period === "month") return monthlyLimit;
  return monthlyLimit * 12;
}

export function buildDashboardSummary(
  userId: string,
  items: Expense[],
  monthlyLimit: number,
  now: Date,
): DashboardSummary {
  const spentThisMonth = items.reduce((sum, item) => {
    return isSameMonth(item.date, now) ? sum + item.amount : sum;
  }, 0);
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const daysRemainingInMonth = Math.max(daysInMonth - now.getDate() + 1, 1);
  const availableToday =
    daysRemainingInMonth > 0
      ? (monthlyLimit - spentThisMonth) / daysRemainingInMonth
      : 0;

  return {
    userId,
    monthlyLimit,
    spentThisMonth,
    availableToday,
    daysRemainingInMonth,
    quartile: getQuartile(spentThisMonth, monthlyLimit),
  };
}

export function buildBudgetStatus(
  items: Expense[],
  monthlyLimit: number,
  period: DashboardPeriod,
  now: Date,
): BudgetStatus {
  const periodInsights = buildPeriodInsights(items, period, now);
  const monthTotal = items.reduce((sum, item) => {
    return isSameMonth(item.date, now) ? sum + item.amount : sum;
  }, 0);
  const estimatedBudget = getEstimatedBudget(period, monthlyLimit, now);
  const spentInPeriod = periodInsights.total;
  const remainingBudget = estimatedBudget - spentInPeriod;
  const progress = Math.min(
    100,
    estimatedBudget > 0 ? (spentInPeriod / estimatedBudget) * 100 : 0,
  );

  return {
    period,
    periodLabel: buildPeriodLabel(period, now),
    estimatedBudget,
    spentInPeriod,
    monthTotal,
    remainingBudget,
    quartile: getQuartile(spentInPeriod, estimatedBudget),
    progress,
  };
}

export function buildPeriodInsights(
  items: Expense[],
  period: DashboardPeriod,
  now: Date,
): PeriodInsights {
  const periodItems = items.filter((item) =>
    isWithinSelectedPeriod(item.date, period, now),
  );
  const categories = buildCategories(periodItems);

  return {
    period,
    label: buildPeriodLabel(period, now),
    total: periodItems.reduce((sum, item) => sum + item.amount, 0),
    series: buildSeries(periodItems, period, now),
    categories,
    topCategory: categories[0] ?? null,
  };
}
