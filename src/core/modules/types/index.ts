/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppRouter } from "@/app/types";

export type AppRegistry = {
  services: Record<string, any>;
  getService: <T>(key: string) => T;
};

export type RepositoryClass = new (...args: any[]) => any;
export type ServiceClass = new (deps: any) => any;

export type RepositoryDefinition = {
  readonly key: string;
  readonly repository: RepositoryClass;
};

export type ServiceDefinition = {
  readonly key: string;
  readonly service: ServiceClass;
};

export type AppListener = (deps: any) => void;

export interface FeatureModule {
  readonly name: string;
  readonly routes?: readonly AppRouter[];
  readonly repositories?: readonly RepositoryDefinition[];
  readonly services?: readonly ServiceDefinition[];
  readonly listeners?: AppListener;
}
