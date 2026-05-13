import type { AppRouter } from "@/app/types";

import { HomeProvider } from "../context/HomeProvider";
import { HomePage } from "../HomePage";

export const HomeRouter: AppRouter[] = [
  {
    component: () => (
      <HomeProvider>
        <HomePage />
      </HomeProvider>
    ),
    path: "/home",
    name: "Inicio",
    order: 0,
  },
];
