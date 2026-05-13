interface FullscreenLoaderProps {
  label?: string;
}

export function FullscreenLoader({
  label = "Cargando sesión...",
}: FullscreenLoaderProps) {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-stone-200 via-stone-100 to-sky-100 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,--theme(--color-sky-300/.25),transparent_28%),radial-gradient(circle_at_bottom_right,--theme(--color-white/.35),transparent_22%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-md w-md -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-stone-50/70 blur-3xl" />

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-300 bg-stone-100/95 px-8 py-7 shadow-2xl shadow-stone-900/12 backdrop-blur">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-stone-300" />
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-600 border-r-sky-600 animate-spin" />
          <span className="absolute inset-[0.6rem] rounded-full bg-cyan-700/20" />
        </div>

        <div className="space-y-1 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            Budgetts
          </p>
          <p className="text-sm font-medium text-stone-700">{label}</p>
        </div>
      </div>
    </section>
  );
}
