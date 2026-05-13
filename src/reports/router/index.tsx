import type { AppRouter } from "@/app/types";

import { ReportPage } from "../ReportPage";

export const ReportRouter: AppRouter[] = [
  {
    component: ReportPage,
    path: "/reports",
    name: "Reporte",
    order: 2,
  },
];
