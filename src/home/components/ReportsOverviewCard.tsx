interface ReportsOverviewCardProps {
  now: Date;
}

function getWeekRangeLabel(now: Date) {
  const start = new Date(now);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const formatter = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

const monthFormatter = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
});

const yearFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
});

const reportCards = [
  {
    title: "Current week",
    description: "Daily flow, strongest day and weekly total.",
  },
  {
    title: "Current month",
    description: "Budget usage, top categories and month pacing.",
  },
  {
    title: "Current year",
    description: "Monthly trend, seasonal spikes and annual total.",
  },
] as const;

export function ReportsOverviewCard({ now }: ReportsOverviewCardProps) {
  const labels = [
    getWeekRangeLabel(now),
    monthFormatter.format(now),
    yearFormatter.format(now),
  ] as const;

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-medium text-stone-700">Reports proposal</p>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-800">
          Time-based reports
        </h2>
      </div>

      <p className="text-sm text-stone-500">
        Keep the home focused on what is happening now, and move the deeper
        analysis into three clear report scopes.
      </p>

      <div className="grid gap-3 lg:grid-cols-3">
        {reportCards.map((item, index) => (
          <article
            key={item.title}
            className="rounded-lg border border-stone-200 bg-white p-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone-500">
              {labels[index]}
            </p>
            <h3 className="mt-2 text-base font-semibold text-stone-800">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-stone-500">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
