import React from "react";

import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "dark" | "danger" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  loading,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none outline-none border-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-cyan-700 text-white border-transparent hover:bg-cyan-800 shadow-sm shadow-cyan-100",
    secondary:
      "bg-stone-200 text-stone-600 border-transparent hover:bg-stone-300",
    dark: "bg-stone-900 text-white border-transparent hover:bg-black",
    danger: "bg-red-50 text-red-600 border-transparent hover:bg-red-100",
    outline:
      "bg-transparent border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300",
  };

  const widthClass = fullWidth ? "w-full" : "w-fit";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="font-medium">Espera...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
