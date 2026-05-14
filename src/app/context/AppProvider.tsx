import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import type { AppRegistry } from "@/core/modules/types";

import { AuthService } from "@/auth/services/auth.service";
import type { UserSession } from "@/auth/types";

import { AppContext } from "./app-context";
import type { AppContextValue } from "../types";

export function AppProvider({
  appRegistry,
  children,
}: {
  appRegistry: AppRegistry;
  children: ReactNode;
}) {
  const authService = appRegistry.getService<AuthService>("authService");
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.observeSession((nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [authService]);

  const value = useMemo(
    (): AppContextValue =>
      ({
        loading,
        session,
        useServices: (...keys: string[]) => {
          return keys.map((key) => {
            const service = appRegistry.getService(key);
            return service;
          });
        },
      }) as AppContextValue,
    [appRegistry, loading, session],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
