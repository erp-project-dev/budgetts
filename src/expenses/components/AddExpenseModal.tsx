import { type FormEvent, useEffect, useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/shared/components/form/Button";
import { Input } from "@/shared/components/form/Input";
import { Label } from "@/shared/components/form/Label";
import { Select } from "@/shared/components/form/Select";
import {
  DEFAULT_EXPENSE_CATEGORY_ID,
  EXPENSE_CATEGORIES,
  type ExpenseCategoryId,
} from "@/shared/constants/expense-categories";
import { DEFAULT_CURRENCY_CODE } from "@/shared/constants/settings";
import type { CurrencyCode } from "@/shared/types/currency";

import { useSignedInApp } from "@/app/hooks/useApp";

import type { Expense } from "../types";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  expense?: Expense | null;
  onSuccess?: (updated: Expense) => void;
}

export function AddExpenseModal({
  open,
  onClose,
  expense,
  onSuccess,
}: AddExpenseModalProps) {
  const {
    services: { expenseService, settingService },
    session,
  } = useSignedInApp();

  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [categoryId, setCategoryId] = useState<ExpenseCategoryId>(
    expense?.categoryId || DEFAULT_EXPENSE_CATEGORY_ID,
  );
  const [description, setDescription] = useState(expense?.description || "");
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(
    expense?.currency || DEFAULT_CURRENCY_CODE,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    settingService.get(session.id).then((conf) => {
      if (conf?.currencyCode) setCurrencyCode(conf.currencyCode);
    });

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, session.id, settingService, onClose]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = Number.parseFloat(amount);
    if (saving || Number.isNaN(value) || value <= 0) return;

    setSaving(true);
    try {
      const payload = {
        amount: value,
        categoryId,
        description: description.trim() || undefined,
        currency: currencyCode,
      };

      let updatedExpense = null;

      if (expense) {
        updatedExpense = await expenseService.update({
          ...expense,
          ...payload,
        });
      } else {
        updatedExpense = await expenseService.create({
          ...payload,
          userId: session.id,
          date: new Date(),
          currency: currencyCode,
        });
      }

      onClose();

      if (onSuccess) {
        onSuccess(updatedExpense);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-stone-950/35 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-stone-300 bg-stone-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-300 px-5 py-4">
          <h2 className="text-xl font-semibold text-stone-900">
            {expense ? "Editar gasto" : "Agregar gasto"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="text-stone-500 hover:text-stone-900"
          >
            <X />
          </button>
        </div>

        <div className="grid gap-4 p-5">
          <div className="grid grid-cols-2 gap-4">
            <Label title="Categoría" required>
              <Select
                value={categoryId}
                onChange={(ev) =>
                  setCategoryId(ev.target.value as ExpenseCategoryId)
                }
                disabled={saving}
                required
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Label>
            <Label title={`Monto (${currencyCode})`} required>
              <Input
                inputMode="decimal"
                value={amount}
                onChange={(ev) => setAmount(ev.target.value)}
                placeholder="0.00"
                disabled={saving}
                required
                autoFocus
              />
            </Label>
          </div>

          <Label title="Descripción">
            <Input
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Ej. Metro, cena..."
              disabled={saving}
            />
          </Label>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : expense ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
