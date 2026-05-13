import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 ml-1">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
            w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm
            rounded-2xl px-4 py-3.5 transition-all duration-200
            placeholder:text-stone-400
            /* Enfoque: usamos el Cyan para consistencia */
            focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-500/10 outline-none
            /* Estado Disabled: consistente con el Button */
            disabled:opacity-40 disabled:bg-stone-100 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-tight">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
