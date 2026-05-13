import { useState } from "react";

import { Section } from "@/shared/components/blocks/Section";
import { SkeletonWrapper } from "@/shared/components/blocks/SkeletonWrapper";

import { CategoryTableCard } from "./components/CategoryTableCard";
import { Header } from "./components/Header";
import { PeriodTabs } from "./components/PeriodTabs";
import { SpendingPeriodCard } from "./components/SpendingPeriodCard";
import { SummaryCard } from "./components/SummaryCard";
import { useHome } from "./hooks/useHome";
import {
  buildBudgetStatus,
  buildPeriodInsights,
  type DashboardPeriod,
} from "./utils/dashboard-insights";

export function HomePage() {
  const { loading, currency, expenses, currentLimit } = useHome();

  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriod>("day");
  const now = new Date();

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
