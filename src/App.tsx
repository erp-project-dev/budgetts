import { Navigate, Route, Routes } from "react-router-dom";

import { AppShellLayout } from "./app/components/AppShellLayout";
import { AppProvider } from "./app/context/AppProvider";
import { ProtectedGuard } from "./app/guards/ProtectedGuard";
import { appRoutes } from "./app/router";
import type { AppRouter } from "./app/types";
import { appRegistry } from "./core";

function sortRoutes(routes: AppRouter[], isPublic = false) {
  return routes.filter((route) => Boolean(route.isPublic) === isPublic);
}

export default function App() {
  return (
    <AppProvider appRegistry={appRegistry}>
      <Routes>
        {sortRoutes(appRoutes, true).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}

        <Route element={<ProtectedGuard />}>
          <Route element={<AppShellLayout />}>
            {sortRoutes(appRoutes).map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  );
}
