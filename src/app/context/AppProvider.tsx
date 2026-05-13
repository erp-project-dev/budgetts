import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { appRegistry } from "@/core";
import type { AppRegistry } from "@/core/modules/types";

import { AuthService } from "@/auth/services/auth.service";
import type { UserSession } from "@/auth/types";

import { AppContext } from "./app-context";
import type { AppContextValue } from "../types";

export function AppProvider({
  appRegistry: { services },
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
        services,
      }) as AppContextValue,
    [loading, services, session],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
