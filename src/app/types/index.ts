/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AppContextValue {
  loading: boolean;
  session: { id: string; name: string } | null;
  useServices: <T extends any[]>(...keys: string[]) => T;
}

export interface AppRouter {
  component: React.ComponentType;
  path: string;
  name: string;
  isPublic?: boolean;
  order?: number;
}
