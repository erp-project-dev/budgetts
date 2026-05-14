import type {
  AppRegistry,
  FeatureModule,
  RepositoryClass,
  ServiceClass,
} from "./types";
import { hasInjectableRegistrationId } from "../decorators/injectable.decorator";
import { Logger } from "../logger";

const toRegistryKey = (name: string) =>
  name.charAt(0).toLowerCase() + name.slice(1);

const getRepositoryKey = (
  repository: unknown,
  repositoryCtor: RepositoryClass,
) =>
  hasInjectableRegistrationId(repository)
    ? repository._REGISTRATION_ID
    : toRegistryKey(repositoryCtor.name);

const getServiceKey = (serviceCtor: ServiceClass) =>
  hasInjectableRegistrationId(serviceCtor.prototype)
    ? serviceCtor.prototype._REGISTRATION_ID
    : toRegistryKey(serviceCtor.name);

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

    for (const repositoryCtor of m.repositories ?? []) {
      const repository = new repositoryCtor();
      const repositoryKey = getRepositoryKey(repository, repositoryCtor);

      repositories[repositoryKey] = repository;
    }

    for (const serviceCtor of m.services ?? []) {
      const serviceKey = getServiceKey(serviceCtor);
      appRegistry.services[serviceKey] = new serviceCtor(repositories);
    }

    if (m.listeners) {
      m.listeners(appRegistry.services);
    }
  }

  return appRegistry;
}
