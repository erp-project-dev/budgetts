import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { Logger } from "@/core/logger";

import type { CurrencyCode } from "@/shared/types/currency";

import { useSignedInApp } from "@/app/hooks/useApp";
import type { ExpenseService } from "@/expenses/services/expense.service";
import type { Expense } from "@/expenses/types";
import type { SettingService } from "@/settings/services/setting.service";

import { HomeContext } from "./home-context";

export function HomeProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { session, useServices } = useSignedInApp();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentLimit, setCurrentLimit] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode>("PEN");

  const [expenseService, settingService] = useServices<
    [ExpenseService, SettingService]
  >("expenseService", "settingService");

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const data = await expenseService.listByUser(session.id);
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

  const value = useMemo(
    () => ({
      loading,
      currentLimit,
      currency,
      expenses,
    }),
    [loading, currentLimit, currency, expenses],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}
