import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
}

export function Card({
  highlighted = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg border-2 bg-karuta-bg p-6 shadow-sm ${
        highlighted ? "border-kincha" : "border-karuta-border"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
