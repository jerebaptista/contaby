"use client";

import { cn } from "@/lib/utils";

type MeiCapProgressProps = {
  /** Pode ultrapassar 100 (ex.: 110). A barra visual limita-se a 100%. */
  percent: number;
  className?: string;
};

export function MeiCapProgress({ percent, className }: MeiCapProgressProps) {
  const width = Math.min(100, Math.max(0, percent));
  const atOrOverCap = percent >= 100;

  return (
    <div
      className={cn(
        "bg-muted relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
      aria-label={`${Math.round(percent)}%`}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-300 ease-out",
          atOrOverCap ? "bg-destructive" : "bg-primary",
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
