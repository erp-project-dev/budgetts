import type { AppRouter } from "@/app/types";

import { ExpensePage } from "../ExpensePage";

export const ExpenseRouter: AppRouter[] = [
  {
    component: ExpensePage,
    path: "/expenses",
    name: "Gastos",
    order: 1,
  },
];
