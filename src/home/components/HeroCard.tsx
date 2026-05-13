interface HeroCardProps {
  now: Date;
}

const weekdayFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
});

const monthDayFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  day: "numeric",
});

const monthYearFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
});

export function HeroCard({ now }: HeroCardProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-medium text-stone-700">Hoy</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl">
          {monthDayFormatter.format(now)}
        </h1>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium capitalize text-sky-700">
            {weekdayFormatter.format(now)}
          </p>
          <p className="text-sm text-stone-500 mt-1">
            Período activo: {monthYearFormatter.format(now)}
          </p>
        </div>
        <div className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700">
          Mes y día actuales visibles de inmediato.
        </div>
      </div>
    </section>
  );
}
