import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { Logger } from "@/core/logger";

import { useSignedOutApp } from "@/app/hooks/useApp";
import type { AuthService } from "@/auth/services/auth.service";

import { LoginContext } from "./login-context";

export function LoginProvider({ children }: { children: ReactNode }) {
  const { session, loading, useServices } = useSignedOutApp();
  const [authService] = useServices<[AuthService]>("authService");

  const isSignedIn = session !== null && !loading;

  const signIn = useCallback(async () => {
    try {
      await authService.signInWithGoogle("popup");
    } catch (error) {
      Logger.error("Error signing in:", error);
    }
  }, [authService]);

  const value = useMemo(
    () => ({
      isSignedIn,
      signIn,
    }),
    [isSignedIn, signIn],
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
