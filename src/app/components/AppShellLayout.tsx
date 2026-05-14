import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthService } from "@/auth/services/auth.service";
import { AddExpenseModal } from "@/expenses/components/AddExpenseModal";

import { AppDrawer } from "./AppDrawer";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader/AppHeader";
import { useSignedInApp } from "../hooks/useApp";

export function AppShellLayout() {
  const { session, useServices } = useSignedInApp();

  const [authService] = useServices<[AuthService]>("authService");

  const [menuOpen, setMenuOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const navigate = useNavigate();

  const sessionLabel = session.name || session.email || "Usuario";

  return (
    <div
      className="relative flex min-h-screen flex-col bg-transparent w-full min-w-screen overflow-x-hidden"
      style={{ minWidth: "100vw" }}
    >
      <AppHeader
        onMenuOpen={() => setMenuOpen(true)}
        onAddExpenseOpen={() => setAddExpenseOpen(true)}
      />

      <AppDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        sessionLabel={sessionLabel}
        onSignOut={() =>
          authService
            .signOut()
            .then(() => navigate("/login", { replace: true }))
        }
      />

      <main className="flex-1 mb-4">
        <Outlet />
      </main>

      <AppFooter releaseLabel={import.meta.env.VITE_RELEASE_AT} />

      {addExpenseOpen && (
        <AddExpenseModal
          open={addExpenseOpen}
          onClose={() => setAddExpenseOpen(false)}
        />
      )}
    </div>
  );
}
