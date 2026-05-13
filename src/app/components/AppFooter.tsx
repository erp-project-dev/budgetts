export function AppFooter({ releaseLabel }: { releaseLabel?: string }) {
  return (
    <footer className="flex justify-between px-4 pb-3 text-[11px] uppercase tracking-[0.12em] text-stone-500 sm:px-6 lg:px-8">
      <span>
        By <span className="text-sky-700">ERP Project</span>
      </span>
      <span className="text-emerald-700">R:{releaseLabel ?? "local"}</span>
    </footer>
  );
}
