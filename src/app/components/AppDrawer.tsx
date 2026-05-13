import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { X } from "lucide-react";

import { Button } from "@/shared/components/form/Button";

import { appRoutes } from "../router";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessionLabel: string;
  onSignOut: () => void;
}

export function AppDrawer({
  isOpen,
  onClose,
  sessionLabel,
  onSignOut,
}: DrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        ref={drawerRef}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col border-r border-zinc-700 bg-zinc-900 p-4 transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase text-zinc-400">
              Navegación
            </p>
            <span className="text-sm font-medium text-zinc-100">Principal</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-zinc-800 transition"
          >
            <X className="text-2xl text-zinc-400" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {appRoutes
            .filter((item) => !item.isPublic)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex min-h-10 items-center rounded-md border px-3 text-sm font-medium transition ${
                    isActive
                      ? "border-sky-600 bg-cyan-700 text-white"
                      : "border-transparent text-zinc-300 hover:bg-zinc-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
        </nav>

        <div className="border-t border-zinc-700 pt-4">
          <div className="mb-3 flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-zinc-100">
              {sessionLabel.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-zinc-400">Sesión activa</p>
              <p className="truncate text-sm text-zinc-100">{sessionLabel}</p>
            </div>
          </div>
          <Button
            onClick={onSignOut}
            className="w-full bg-zinc-800 text-zinc-200"
            variant="dark"
          >
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  );
}
