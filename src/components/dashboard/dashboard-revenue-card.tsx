"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrimaryGradientArea } from "@/components/dashboard/chart-primary-area";
import { DashboardRevenueChartTooltip } from "@/components/dashboard/dashboard-revenue-chart-tooltip";
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
        monthLabel: format.dateTime(new Date(p.year, p.month - 1, 1), {
          month: "long",
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
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-0 pt-4">
        <CardTitle className="min-w-0 text-base font-medium">
          {t("monthTitle", { month: monthName })}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-primary shrink-0"
          asChild
        >
          <Link href="/financial/revenue" aria-label={t("ctaAria")}>
            <ChevronRight className="size-4" />
          </Link>
        </Button>
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
              <XAxis dataKey="monthLabel" hide />
              <YAxis hide domain={yDomain} />
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
                    <DashboardRevenueChartTooltip
                      monthLabel={row.monthLabel}
                      valueCents={cents}
                    />
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
