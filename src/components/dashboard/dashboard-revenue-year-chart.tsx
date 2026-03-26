"use client";

import * as React from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import {
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrimaryGradientArea } from "@/components/dashboard/chart-primary-area";
import { formatCurrencyBRL } from "@/lib/format/currency";
import type { MonthlyRevenuePoint } from "@/lib/mocks/dashboard-revenue";

const AXIS_LABEL_FONT_PX = 11;

type DashboardRevenueYearChartProps = {
  series: MonthlyRevenuePoint[];
};

export function DashboardRevenueYearChart({ series }: DashboardRevenueYearChartProps) {
  const t = useTranslations("Dashboard.home.yearChart");
  const format = useFormatter();
  const locale = useLocale();
  const gradientId = React.useId().replace(/:/g, "");

  const year = series[0]?.year ?? new Date().getFullYear();
  const n = series.length;

  const chartData = React.useMemo(
    () =>
      series.map((p) => ({
        monthShort: format.dateTime(new Date(p.year, p.month - 1, 1), {
          month: "short",
        }),
        monthLabel: format.dateTime(new Date(p.year, p.month - 1, 1), {
          month: "long",
        }),
        value: p.valueCents / 100,
      })),
    [series, format],
  );

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="gap-1 pb-0 pt-4">
        <CardTitle className="text-base font-semibold leading-tight">
          {t("title", { year })}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-4">
        <div className="h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 16, left: 16, bottom: 22 }}
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeOpacity={0.6}
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="monthShort"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={(props) => {
                  const { x, y, payload, index } = props as {
                    x: number;
                    y: number;
                    payload: { value: string };
                    index: number;
                  };
                  const anchor =
                    index === 0
                      ? "start"
                      : index === n - 1
                        ? "end"
                        : "middle";
                  return (
                    <text
                      x={x}
                      y={y}
                      dy={16}
                      textAnchor={anchor}
                      fill="var(--muted-foreground)"
                      style={{
                        fontSize: AXIS_LABEL_FONT_PX,
                      }}
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: AXIS_LABEL_FONT_PX,
                  fill: "var(--muted-foreground)",
                }}
                tickFormatter={(v) =>
                  new Intl.NumberFormat(locale, {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(Number(v))
                }
                width={44}
              />
              <Tooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 0.5 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const row = payload[0]?.payload as
                    | { monthLabel: string; value: number }
                    | undefined;
                  if (!row) return null;
                  const cents = Math.round(row.value * 100);
                  return (
                    <div className="rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
                      <div className="text-muted-foreground">{row.monthLabel}</div>
                      <div className="font-numeric font-medium tabular-nums">
                        {formatCurrencyBRL(cents)}
                      </div>
                    </div>
                  );
                }}
              />
              <PrimaryGradientArea gradientId={gradientId} dataKey="value" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
