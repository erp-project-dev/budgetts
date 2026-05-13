import React, { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, error, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`
            w-full appearance-none bg-stone-50 border border-stone-200 text-stone-900 text-sm
            rounded-2xl px-4 py-3.5 pr-10 transition-all duration-200
            /* Enfoque: Identidad Cyan */
            focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-500/10 outline-none
            /* Estados */
            disabled:opacity-40 disabled:bg-stone-100 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-stone-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";
