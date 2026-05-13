import type { AppRegistry, FeatureModule } from "./types";
import { Logger } from "../logger";

export function buildAppFromModules(modules: readonly FeatureModule[]) {
  const appRegistry: AppRegistry = {
    services: {},
    getService(key) {
      const service = this.services[key];

      if (!service) {
        throw new Error(`Service not found for ${key}`);
      }

      return service;
    },
  };

  const repositories: Record<string, unknown> = {};

  for (const m of modules) {
    Logger.info(`Initializing feature module: ${m.name}`);

    for (const repoDef of m.repositories ?? []) {
      repositories[repoDef.key] = new repoDef.repository();
    }

    for (const serviceDef of m.services ?? []) {
      appRegistry.services[serviceDef.key] = new serviceDef.service(
        repositories,
      );
    }

    if (m.listeners) {
      m.listeners(appRegistry);
    }
  }

  return appRegistry;
}
