import type { ReactNode } from "react";
import clsx from "clsx";

type CardVariant = "default" | "surface";
type CardPadding = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[var(--bg-card)] border border-[var(--border)]",
  surface:
    "bg-[var(--bg-surface)] border border-[var(--border)]",
};

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  variant = "default",
  padding = "md",
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl shadow-sm transition-colors",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}