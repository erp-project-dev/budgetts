import { useContext } from "react";

import type { UserSession } from "@/auth/types";

import { AppContext } from "../context/app-context";
import type { AppContextValue } from "../types";

type SignedInAppContext = Omit<AppContextValue, "session"> & {
  session: UserSession;
};

export function useSignedOutApp(): AppContextValue {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useSignedOutApp must be used within an AppProvider");
  }

  return context;
}

export function useSignedInApp(): SignedInAppContext {
  const context = useContext(AppContext);

  if (!context || (!context.loading && !context.session)) {
    throw new Error("useSignedInApp must be used within a signed-in context");
  }

  return context as SignedInAppContext;
}
