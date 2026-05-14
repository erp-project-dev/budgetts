import type { FeatureModule } from "@/core/modules/types";

import { SettingRepository } from "@/settings/repositories/setting.repository";
import { SettingRouter } from "@/settings/router";
import { SettingService } from "@/settings/services/setting.service";

export const settingModule: FeatureModule = {
  name: "settings",
  routes: SettingRouter,
  repositories: [SettingRepository],
  services: [SettingService],
};
