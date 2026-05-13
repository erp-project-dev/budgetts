import { useEffect, useState } from "react";

import { Section } from "@/shared/components/blocks/Section";
import { SkeletonWrapper } from "@/shared/components/blocks/SkeletonWrapper";
import { monthNames } from "@/shared/constants/months";
import { formatCurrency } from "@/shared/utils/currency-format";

import { useSignedInApp } from "@/app/hooks/useApp";

import type { MonthlyReportItem } from "./types";

export function ReportPage() {
  const {
    session,
    services: { reportService },
  } = useSignedInApp();
  const [data, setData] = useState<MonthlyReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      const result = await reportService.getMonthlyReport(session.id);
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [session.id, reportService]);

  if (loading) {
    return (
      <Section title="Reportes" description="Historial mensual">
        <SkeletonWrapper className="gap-3 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-2xl border border-stone-100"
            >
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 bg-stone-100 rounded-xl" />
                <div className="space-y-1">
                  <div className="h-4 w-16 bg-stone-200 rounded" />
                  <div className="h-3 w-10 bg-stone-100 rounded" />
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-stone-100" />
            </div>
          ))}
        </SkeletonWrapper>
      </Section>
    );
  }

  return (
    <Section title="Reportes" description="Historial de gastos">
      <ul className="flex flex-col">
        {data.map((item, idx) => {
          const percentage = Math.min((item.expense / item.budget) * 100, 100);
          const isOverBudget = item.expense > item.budget;

          return (
            <li
              key={idx}
              className="flex items-center gap-4 py-4 border-b border-stone-200 last:border-0 active:bg-stone-50/50 transition-colors"
            >
              <div className="flex flex-col items-start min-w-14">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">
                  {item.year}
                </span>
                <span className="text-base font-black text-stone-900 uppercase tracking-tighter">
                  {monthNames[parseInt(item.month, 10) - 1]}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-xl font-black tabular-nums tracking-tight ${isOverBudget ? "text-red-600" : "text-stone-900"}`}
                  >
                    {formatCurrency(item.expense, item.currency)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Tope
                  </span>
                  <span className="text-xs font-bold text-stone-500 tabular-nums">
                    {formatCurrency(item.budget, item.currency)}
                  </span>
                </div>
              </div>

              <div className="relative flex items-center justify-center w-12 h-12">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-stone-100"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={119.38}
                    strokeDashoffset={119.38 - (119.38 * percentage) / 100}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ${
                      isOverBudget ? "text-red-500" : "text-cyan-600"
                    }`}
                  />
                </svg>
                <span
                  className={`absolute text-[10px] font-black leading-none ${isOverBudget ? "text-red-600" : "text-stone-700"}`}
                >
                  {Math.round(percentage)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
