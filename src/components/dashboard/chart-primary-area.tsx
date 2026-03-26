"use client";

import * as React from "react";
import type { ComponentProps } from "react";
import { Area } from "recharts";

const STROKE_WIDTH = 1.75;

type PrimaryGradientAreaProps = Omit<ComponentProps<typeof Area>, "ref"> & {
  gradientId: string;
};

/** Área com traço e preenchimento em `primary` + gradiente vertical (Recharts). */
export function PrimaryGradientArea({
  gradientId,
  ...props
}: PrimaryGradientAreaProps) {
  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--primary)"
            stopOpacity={0.38}
          />
          <stop
            offset="100%"
            stopColor="var(--primary)"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <Area
        type="natural"
        stroke="var(--primary)"
        strokeWidth={STROKE_WIDTH}
        fill={`url(#${gradientId})`}
        fillOpacity={1}
        dot={false}
        activeDot={{
          r: 4,
          strokeWidth: 0,
          fill: "var(--primary)",
        }}
        isAnimationActive={false}
        {...props}
      />
    </>
  );
}
