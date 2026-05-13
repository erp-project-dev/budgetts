import { createContext } from "react";

import type { LoginContextValue } from "../types";

export const LoginContext = createContext<LoginContextValue | null>(null);
