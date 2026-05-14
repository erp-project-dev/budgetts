/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppRouter } from "@/app/types";

export type AppRegistry = {
  services: Record<string, any>;
  getService: <T>(key: string) => T;
};

export type RepositoryClass = new (...args: any[]) => any;
export type ServiceClass = new (deps: any) => any;

export type AppListener = (deps: any) => void;

export interface FeatureModule {
  readonly name: string;
  readonly routes?: readonly AppRouter[];
  readonly repositories?: readonly RepositoryClass[];
  readonly services?: readonly ServiceClass[];
  readonly listeners?: AppListener;
}
