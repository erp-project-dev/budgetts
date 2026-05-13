import { createContext } from "react";

import type { HomeContextValue } from "../types";

export const HomeContext = createContext<HomeContextValue | null>(null);
