import { featureModules } from "@/core";

import type { AppRouter } from "../types";

export const appRoutes = featureModules
  .flatMap((m) => m.routes)
  .filter((m) => m !== undefined);

function buildShellNavItems(routes: AppRouter[]) {
  return routes
    .filter(
      (r): r is AppRouter & { order: number } =>
        typeof r.order === "number" && !r.isPublic,
    )
    .sort((a, b) => a.order - b.order)
    .map((r) => ({
      path: r.path,
      label: r.name,
    }));
}

export const shellNavItems = buildShellNavItems(appRoutes);
