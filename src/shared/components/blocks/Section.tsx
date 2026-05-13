import React from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Section = ({
  title,
  description,
  children,
  footer,
  className = "",
}: SectionProps) => {
  const headingId = React.useId();

  return (
    <div className="p-4">
      <section aria-labelledby={headingId}>
        <header className="p-4 -mb-2">
          <h2
            id={headingId}
            className="text-xl font-black tracking-tight text-stone-900 leading-tight"
          >
            {title}
          </h2>
          {description && (
            <p className="text-sm leading-relaxed text-stone-500 font-medium">
              {description}
            </p>
          )}
        </header>

        <div
          className={`bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden ${className}`}
        >
          <div className="p-4 space-y-6">{children}</div>

          {footer && (
            <>
              <div className="border-t border-stone-200 mb-4" />
              <footer className="px-4 pb-4 flex items-center justify-start">
                {footer}
              </footer>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
