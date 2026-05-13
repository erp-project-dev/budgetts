import type { AppRegistry, FeatureModule, ServiceClass } from "./types";
import { Logger } from "../logger";

function classToPropertyKey(ctor: { name: string }): string {
  return ctor.name.charAt(0).toLowerCase() + ctor.name.slice(1);
}

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

    for (const Repo of m.repositories ?? []) {
      const key = classToPropertyKey(Repo);
      repositories[key] = new (Repo as new () => object)();
    }

    for (const Svc of m.services ?? []) {
      const key = classToPropertyKey(Svc);
      appRegistry.services[key] = new (Svc as ServiceClass)(repositories);
    }

    if (m.listeners) {
      m.listeners(appRegistry);
    }
  }

  return appRegistry;
}
