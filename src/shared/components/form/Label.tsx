import React from "react";

interface LabelProps {
  title: string;
  children: React.ReactNode;
  helper?: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Label = ({
  title,
  children,
  helper,
  error,
  required,
  className = "",
}: LabelProps) => {
  return (
    <label className={`flex flex-col w-full ${className}`}>
      <span className="ml-1 mb-1.5 flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-stone-600">
        {title}
        {required && <span className="text-cyan-600 ml-0.5">*</span>}
      </span>

      <div className="relative w-full">{children}</div>

      {(error || helper) && (
        <div className="mt-1.5 ml-1">
          {error ? (
            <p className="text-[10px] font-bold uppercase tracking-tight text-red-500 animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          ) : (
            <div className="text-xs leading-relaxed tracking-tight text-stone-500">
              {helper}
            </div>
          )}
        </div>
      )}
    </label>
  );
};
