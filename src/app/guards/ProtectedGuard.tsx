import { Navigate, Outlet, useLocation } from "react-router-dom";

import { FullscreenLoader } from "@/shared/components/FullscreenLoader";

import { useSignedOutApp } from "../hooks/useApp";

export function ProtectedGuard() {
  const { session, loading } = useSignedOutApp();
  const location = useLocation();

  if (loading) {
    return <FullscreenLoader label="Preparando tu sesión..." />;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
