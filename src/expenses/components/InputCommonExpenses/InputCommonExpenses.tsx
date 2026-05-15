import { useMemo, useRef, useState } from "react";

import { Search, X, Zap } from "lucide-react";

import { Input } from "@/shared/components/form/Input";
import { getExpenseCategoryLabel } from "@/shared/constants/expense-categories";
import { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

import { ExpenseTemplate } from "@/expenses/types";

import { COMMON_EXPENSES } from "./templates";

interface InputCommonExpensesProps {
  value: string;
  onChange: (value: string) => void;
  onSelectTemplate: (template: ExpenseTemplate) => void;
  error?: string;
  disabled?: boolean;
  currrencyCode: CurrencyCode;
}

export const InputCommonExpenses = ({
  value,
  onChange,
  onSelectTemplate,
  error,
  disabled,
  currrencyCode,
}: InputCommonExpensesProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const query = value.toLowerCase().trim();
    if (query.length < 2) return [];

    return COMMON_EXPENSES.filter((t) => {
      const labelMatch = t.label.toLowerCase().includes(query);
      const keywordMatch = t.keywords.some((k) =>
        k.toLowerCase().includes(query),
      );

      return labelMatch || keywordMatch;
    });
  }, [value]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <Input
          error={error}
          value={value}
          disabled={disabled}
          placeholder="Ej. Starbucks, Almuerzo..."
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-11 pr-10"
          autoFocus
        />

        <Search className="absolute left-4 top-4.5 w-4 h-4 text-stone-400 pointer-events-none" />

        {value && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-3.5 p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-600 transition-colors"
            title="Limpiar contenido"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showSuggestions && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-900/5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 border-b border-stone-100 bg-stone-50/50">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-2">
              Sugerencias rápidas
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filtered.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onSelectTemplate(item);
                  setShowSuggestions(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cyan-50 text-left transition-colors border-b last:border-0 border-stone-50 group"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                  <Zap className="w-4 h-4 text-stone-400 group-hover:text-cyan-600" />
                </div>

                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-stone-900 text-sm group-hover:not-italic">
                    {item.label}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-tight">
                    {getExpenseCategoryLabel(item.categoryId)}{" "}
                    {item.amount
                      ? `· Sugerido: ${formatCurrency(item.amount, currrencyCode, 0)}`
                      : ""}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
