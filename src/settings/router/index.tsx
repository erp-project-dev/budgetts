import type { AppRouter } from "@/app/types";

import { SettingPage } from "../SettingPage";

export const SettingRouter: AppRouter[] = [
  {
    component: SettingPage,
    path: "/settings",
    name: "Configuración",
    order: 3,
  },
];
