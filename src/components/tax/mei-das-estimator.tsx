"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MEI_ANNUAL_REVENUE_CAP_CENTS,
  suggestMeiDas,
  type MeiActivityKind,
} from "@/lib/tax/mei";

const ACTIVITIES: MeiActivityKind[] = [
  "commerce",
  "services",
  "industry",
  "commerce_services",
];

function parseAnnualRevenueToCents(raw: string): number | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  const normalized = t.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  if (Number.isNaN(n) || n < 0) return undefined;
  return Math.round(n * 100);
}

export function MeiDasEstimator() {
  const t = useTranslations("Dashboard.meiDas");
  const format = useFormatter();
  const [activity, setActivity] =
    React.useState<MeiActivityKind>("commerce");
  const [revenueRaw, setRevenueRaw] = React.useState("");

  const annualRevenueCents = React.useMemo(
    () => parseAnnualRevenueToCents(revenueRaw),
    [revenueRaw],
  );

  const suggestion = React.useMemo(
    () =>
      suggestMeiDas({
        activityKind: activity,
        annualRevenueCents,
      }),
    [activity, annualRevenueCents],
  );

  const formatMoney = (cents: number) =>
    format.number(cents / 100, {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const capFormatted = formatMoney(MEI_ANNUAL_REVENUE_CAP_CENTS);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("estimatorTitle")}</CardTitle>
        <CardDescription>{t("estimatorDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mei-activity">{t("activityLabel")}</Label>
          <Select
            value={activity}
            onValueChange={(v) => setActivity(v as MeiActivityKind)}
          >
            <SelectTrigger id="mei-activity" className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACTIVITIES.map((a) => (
                <SelectItem key={a} value={a}>
                  {t(`activities.${a}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mei-revenue">{t("annualRevenueLabel")}</Label>
          <Input
            id="mei-revenue"
            type="text"
            inputMode="decimal"
            placeholder={t("annualRevenuePlaceholder")}
            value={revenueRaw}
            onChange={(e) => setRevenueRaw(e.target.value)}
            className="max-w-md"
            autoComplete="off"
          />
          <p className="text-muted-foreground text-xs">{t("annualRevenueHint", { cap: capFormatted })}</p>
        </div>

        {suggestion.warnings.includes("annual_revenue_over_mei_cap") ? (
          <Alert variant="default" className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-50">
            <AlertTriangle className="size-4" />
            <AlertTitle>{t("warnOverCapTitle")}</AlertTitle>
            <AlertDescription>{t("warnOverCapDescription")}</AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
          <p className="text-muted-foreground text-xs">
            {t("minimumWageNote", {
              amount: formatMoney(suggestion.minimumWageCents),
              ref: suggestion.minimumWageReferenceId,
            })}
          </p>
          <ul className="space-y-1.5 text-sm">
            {suggestion.breakdown.map((line) => (
              <li
                key={line.key}
                className="flex justify-between gap-4 border-b border-border/60 py-1 last:border-0"
              >
                <span>{t(`lines.${line.key}`)}</span>
                <span className="tabular-nums">{formatMoney(line.amountCents)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between gap-4 border-t pt-2 text-sm font-medium">
            <span>{t("totalLabel")}</span>
            <span className="tabular-nums">{formatMoney(suggestion.totalCents)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs leading-relaxed">
        {t("disclaimer")}
      </CardFooter>
    </Card>
  );
}
