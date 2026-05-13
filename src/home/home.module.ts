import type { FeatureModule } from "@/core/modules/types";

import { HomeRouter } from "@/home/router";

export const homeModule: FeatureModule = {
  name: "home",
  routes: HomeRouter,
};
