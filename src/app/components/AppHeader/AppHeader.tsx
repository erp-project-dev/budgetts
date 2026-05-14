import { WalletIcon } from "lucide-react";

import { AppHeaderBudget } from "./components/AppHeaderBudget";

interface HeaderProps {
  onMenuOpen: () => void;
  onAddExpenseOpen: () => void;
}

export function AppHeader({ onMenuOpen, onAddExpenseOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-700/80 bg-zinc-900/90 backdrop-blur items-center">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:px-6 lg:px-8">
        <div className="flex justify-start pl-4">
          <button
            type="button"
            className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
            onClick={onMenuOpen}
          >
            <span className="relative block h-0.5 w-5 rounded-full bg-current before:absolute before:-top-1.5 before:left-0 before:h-0.5 before:w-5 before:rounded-full before:bg-current after:absolute after:top-1.5 after:left-0 after:h-0.5 after:w-5 after:rounded-full after:bg-current" />
          </button>
        </div>

        <div className="flex text-zinc-100 py-4 items-center">
          <span className="block truncate text-sm font-semibold uppercase tracking-[0.26em] flex-1">
            BUDGET<span className="font-bold text-blue-200">TS</span>
          </span>
          <AppHeaderBudget />
        </div>

        <div className="flex justify-end pr-4">
          <button
            type="button"
            className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
            onClick={onAddExpenseOpen}
          >
            <WalletIcon className="block h-5 w-5 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
}
