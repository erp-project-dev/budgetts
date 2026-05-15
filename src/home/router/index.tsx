import type { AppRouter } from "@/app/types";

import { HomePage } from "../HomePage";

export const HomeRouter: AppRouter[] = [
  {
    component: HomePage,
    path: "/home",
    name: "Inicio",
    order: 0,
  },
];
