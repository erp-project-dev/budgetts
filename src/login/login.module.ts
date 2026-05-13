import type { FeatureModule } from "@/core/modules/types";

import { LoginRouter } from "@/login/router";

export const loginModule: FeatureModule = {
  name: "login",
  routes: LoginRouter,
};
