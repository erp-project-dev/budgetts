import type { FeatureModule } from "@/core/modules/types";

import { AuthRepository } from "./repositories/auth.repository";
import { AuthService } from "./services/auth.service";

export const authModule: FeatureModule = {
  name: "auth",
  repositories: [{ key: "authRepository", repository: AuthRepository }],
  services: [{ key: "authService", service: AuthService }],
};
