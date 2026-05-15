import { useEffect, useState } from "react";

import { Logger } from "@/core/logger";

import { Section } from "@/shared/components/blocks/Section";
import { SkeletonWrapper } from "@/shared/components/blocks/SkeletonWrapper";
import { CurrencyCode } from "@/shared/types/currency";
import { getCurrentPeriod } from "@/shared/utils/date";

import { useSignedInApp } from "@/app/hooks/useApp";
import { ExpenseService } from "@/expenses/services/expense.service";
import { Expense } from "@/expenses/types";
import { SettingService } from "@/settings/services/setting.service";

import { CategoryTableCard } from "./components/CategoryTableCard";
import { Header } from "./components/Header";
import { PeriodTabs } from "./components/PeriodTabs";
import { SpendingPeriodCard } from "./components/SpendingPeriodCard";
import { SummaryCard } from "./components/SummaryCard";
import {
  buildBudgetStatus,
  buildPeriodInsights,
  type DashboardPeriod,
} from "./utils/dashboard-insights";

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const { session, useServices } = useSignedInApp();

  const [expenseService, settingService] = useServices<
    [ExpenseService, SettingService]
  >("expenseService", "settingService");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode>("PEN");

  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriod>("day");
  const now = new Date();

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const data = await expenseService.listByUser(
          session.id,
          getCurrentPeriod(),
        );
        const setting = await settingService.get(session.id);

        setExpenses(data);
        setCurrentLimit(setting.monthlyLimit);
        setCurrency(setting.currencyCode);
      } catch (error) {
        Logger.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [expenseService, session.id, settingService]);

  if (loading)
    return (
      <SkeletonWrapper>
        <div className="flex flex-col gap-2 p-4 animate-pulse">
          <div className="h-16 w-full rounded-2xl bg-stone-100" />
          <div className="h-10 w-full rounded-xl bg-stone-50" />
          <div className="h-60 w-full rounded-4xl bg-stone-50" />
          <div className="h-60 w-full rounded-4xl bg-stone-50" />
        </div>
      </SkeletonWrapper>
    );

  const summary = buildBudgetStatus(
    expenses,
    currentLimit,
    selectedPeriod,
    now,
  );

  const insights = buildPeriodInsights(expenses, selectedPeriod, now);

  return (
    <main>
      <Header
        periodLabel={summary.periodLabel}
        monthTotal={summary.monthTotal}
        monthlyLimit={summary.estimatedBudget}
        currency={currency}
      />

      <nav className="px-4">
        <PeriodTabs value={selectedPeriod} onChange={setSelectedPeriod} />
      </nav>

      <Section
        title="Resumen"
        description="Progreso de consumo vs límite mensual"
      >
        <SummaryCard summary={summary} currency={currency} />
      </Section>

      <Section
        title="Evolución"
        description="Distribución de gastos en el período"
      >
        <SpendingPeriodCard
          insights={insights}
          quartile={summary.quartile}
          currency={currency}
        />
      </Section>

      <Section title="Categorías" description="Detalle de gastos por grupo">
        <CategoryTableCard insights={insights} currency={currency} />
      </Section>
    </main>
  );
}
