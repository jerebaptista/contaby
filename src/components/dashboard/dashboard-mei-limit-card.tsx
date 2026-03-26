"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrencyBRL } from "@/lib/format/currency";

type DashboardMeiLimitCardProps = {
  currentMonthCents: number;
  limitCents: number;
};

export function DashboardMeiLimitCard({
  currentMonthCents,
  limitCents,
}: DashboardMeiLimitCardProps) {
  const t = useTranslations("Dashboard.home.meiLimitCard");
  const pct =
    limitCents <= 0
      ? 0
      : Math.min(100, Math.round((currentMonthCents / limitCents) * 100));

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-0 pt-4">
        <div>
          <CardTitle className="text-base font-semibold leading-tight">
            {t("title")}
          </CardTitle>
        </div>
        <span className="text-right text-base font-semibold leading-tight tabular-nums text-foreground">
          {pct}%
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-3">
        <Progress value={pct} className="h-2" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("used", { value: formatCurrencyBRL(currentMonthCents) })}</span>
          <span>{t("limit", { value: formatCurrencyBRL(limitCents) })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
