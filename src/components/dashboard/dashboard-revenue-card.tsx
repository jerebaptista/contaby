"use client";

import * as React from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrimaryGradientArea } from "@/components/dashboard/chart-primary-area";
import { formatCurrencyBRL } from "@/lib/format/currency";
import type { MonthlyRevenuePoint } from "@/lib/mocks/dashboard-revenue";
import { percentChangeVsPreviousMonth } from "@/lib/mocks/dashboard-home";

type DashboardRevenueCardProps = {
  series: MonthlyRevenuePoint[];
};

export function DashboardRevenueCard({ series }: DashboardRevenueCardProps) {
  const t = useTranslations("Dashboard.home.revenueCard");
  const format = useFormatter();
  const gradientId = React.useId().replace(/:/g, "");

  const last = series[series.length - 1];
  const deltaPct = percentChangeVsPreviousMonth(series);

  const chartData = React.useMemo(
    () =>
      series.map((p) => ({
        label: format.dateTime(new Date(p.year, p.month - 1, 1), {
          month: "short",
        }),
        value: p.valueCents / 100,
      })),
    [series, format],
  );

  /** Domínio Y com folga simétrica: a spline `natural` extrapola acima e abaixo dos pontos. */
  const yDomain = React.useMemo(() => {
    const values = chartData.map((d) => d.value);
    if (values.length === 0) return [0, 1] as [number, number];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = Math.max(max - min, Math.abs(max) * 0.03 || 1);
    const pad = span * 0.22;
    return [min - pad, max + pad] as [number, number];
  }, [chartData]);

  const monthName = format.dateTime(new Date(last.year, last.month - 1, 1), {
    month: "long",
  });

  const deltaText =
    deltaPct == null ? null : deltaPct >= 0
      ? t("deltaUp", { value: Math.abs(deltaPct).toFixed(1) })
      : t("deltaDown", { value: Math.abs(deltaPct).toFixed(1) });

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="gap-0.5 pb-0 pt-4">
        <CardTitle className="text-base font-medium">
          {t("monthTitle", { month: monthName })}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 px-4 pb-4 pt-4">
        <div className="space-y-0.5">
          <p className="font-numeric text-3xl font-semibold tracking-tight tabular-nums">
            {formatCurrencyBRL(last.valueCents)}
          </p>
          {deltaText ? (
            <p className="text-muted-foreground text-sm">{deltaText}</p>
          ) : null}
        </div>
        <div className="h-[88px] w-full min-w-0 pb-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 2, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="label" hide />
              <YAxis hide domain={yDomain} />
              <Tooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 0.5 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const row = payload[0]?.payload as
                    | { label: string; value: number }
                    | undefined;
                  if (!row) return null;
                  const cents = Math.round(row.value * 100);
                  return (
                    <div className="rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
                      <div className="text-muted-foreground">{row.label}</div>
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
