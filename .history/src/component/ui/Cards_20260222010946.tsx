import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}