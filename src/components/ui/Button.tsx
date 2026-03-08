import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-wa disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-indigo-wa text-white hover:bg-indigo-wa/90 border border-indigo-wa",
    secondary:
      "bg-karuta-bg text-sumi border border-karuta-border hover:bg-karuta-border/30",
    ghost: "bg-transparent text-sumi hover:bg-karuta-border/20 border border-transparent",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
