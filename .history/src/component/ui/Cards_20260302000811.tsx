// src/components/ui/Card.tsx

import type { ReactNode, ElementType } from "react";
import clsx from "clsx";

type CardVariant = "default" | "surface" | "outline";
type CardPadding = "none" | "xs" | "sm" | "md";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  fullHeight?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-[#6963b55b] border border-[var(--border)]",
  surface: "bg-[var(--bg-surface)] border border-[var(--border)]",
  outline: "bg-transparent border border-[var(--border)]",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
};

export default function Card({
  children,
  className,
  as: Component = "div",
  variant = "default",
  padding = "xs",
  hover = false,
  fullHeight = false,
}: CardProps) {
  return (
    <Component
      className={clsx(
        "rounded-lg transition-all duration-150",
        variantStyles[variant],
        paddingStyles[padding],
        hover && "hover:shadow-md hover:-translate-y-0.5",
        fullHeight && "h-full",
        className
      )}
    >
      {children}
    </Component>
  );
}