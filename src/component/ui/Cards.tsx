// src/components/ui/Card.tsx

import  type { ReactNode, ElementType } from "react";
import clsx from "clsx";

type CardVariant = "default" | "surface" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";

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
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  as: Component = "div",
  variant = "default",
  padding = "md",
  hover = false,
  fullHeight = false,
}: CardProps) {
  return (
    <Component
      className={clsx(
        "rounded-xl transition-all duration-200",
        variantStyles[variant],
        paddingStyles[padding],
        hover && "hover:shadow-lg hover:-translate-y-1",
        fullHeight && "h-full",
        className
      )}
    >
      {children}
    </Component>
  );
}