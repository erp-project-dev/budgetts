import { type FormEvent, useEffect, useRef, useState } from "react";

import { Section } from "@/shared/components/blocks/Section";
import { SkeletonWrapper } from "@/shared/components/blocks/SkeletonWrapper";
import { Button } from "@/shared/components/form/Button";
import { Input } from "@/shared/components/form/Input";
import { Label } from "@/shared/components/form/Label";
import { Select } from "@/shared/components/form/Select";
import type { CurrencyCode } from "@/shared/types/currency";
import { formatCurrency } from "@/shared/utils/currency-format";

import { useSignedInApp } from "@/app/hooks/useApp";

import type { Setting } from "./types";

const DEFAULT_CURRENCY: CurrencyCode = "PEN";

export function SettingPage() {
  const {
    session,
    services: { settingService },
  } = useSignedInApp();

  const [config, setConfig] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [currencyDraft, setCurrencyDraft] = useState<CurrencyCode | null>(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (!session?.id) return;
    let cancelled = false;

    const fetchConfig = async () => {
      setLoading(true);
      try {
        const data = await settingService.get(session.id);
        if (!cancelled) setConfig(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchConfig();
    return () => {
      cancelled = true;
    };
  }, [session?.id, settingService]);

  if (!session) return null;

  if (loading || !config) {
    return (
      <SkeletonWrapper>
        <div>
          <div className="mb-4 h-3 w-40 rounded bg-stone-200" />
          <div className="h-8 w-56 rounded bg-stone-300" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-3 w-16 rounded bg-stone-200" />
            <div className="min-h-10 rounded-md border border-stone-300 bg-stone-50" />
          </div>
          <div className="h-4 w-52 rounded bg-stone-200" />
          <div className="space-y-2">
            <div className="h-3 w-36 rounded bg-stone-200" />
            <div className="min-h-10 rounded-md border border-stone-300 bg-stone-50" />
          </div>
          <div className="h-4 w-72 rounded bg-stone-200" />
          <div className="h-10 w-28 rounded-md bg-sky-200" />
        </div>
      </SkeletonWrapper>
    );
  }

  const userId = session.id;
  const selectedCurrency =
    currencyDraft ?? config.currencyCode ?? DEFAULT_CURRENCY;
  const limitStr =
    monthlyLimit ||
    (config.monthlyLimit !== undefined ? String(config.monthlyLimit) : "");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving || isSubmittingRef.current) return;

    const rawValue = monthlyLimit || String(config?.monthlyLimit);
    const value = Number.parseFloat(rawValue);

    if (Number.isNaN(value) || value <= 0) return;

    const next: Setting = {
      ...config,
      userId,
      monthlyLimit: value,
      currencyCode: selectedCurrency,
    };

    isSubmittingRef.current = true;
    setSaving(true);

    try {
      await settingService.save(next);
      setConfig(next);
      setMonthlyLimit("");
      setCurrencyDraft(null);
    } finally {
      setSaving(false);
      isSubmittingRef.current = false;
    }
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)}>
      <Section
        title="Configuración de presupuesto"
        description="Desde aquí podrás configurar tu moneda y tu presupuesto"
        footer={
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        }
      >
        <Label
          title="Moneda"
          helper={`Vista previa: ${formatCurrency(1234.56, selectedCurrency)}`}
          required
        >
          <Select
            name="currency"
            value={selectedCurrency}
            onChange={(ev) => setCurrencyDraft(ev.target.value as CurrencyCode)}
            disabled={saving}
            required
          >
            <option disabled value="USD">
              Dólar estadounidense (USD)
            </option>
            <option value="PEN">Nuevo sol (PEN)</option>
          </Select>
        </Label>
        <Label title="Tope mensual de gasto" required>
          <Input
            inputMode="decimal"
            name="monthlyLimit"
            value={limitStr}
            onChange={(ev) => setMonthlyLimit(ev.target.value)}
            disabled={saving}
            required
          />
        </Label>
      </Section>
    </form>
  );
}
