"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { DashboardTaxMock } from "@/lib/mocks/dashboard-home";

type DashboardTaxesCardProps = {
  taxes: DashboardTaxMock[];
};

export function DashboardTaxesCard({ taxes }: DashboardTaxesCardProps) {
  const t = useTranslations("Dashboard.home.taxesCard");
  const format = useFormatter();
  const [paidMap, setPaidMap] = React.useState<Record<string, boolean>>({});

  const formatMoney = (cents: number) =>
    format.number(cents / 100, {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDue = (iso: string) =>
    format.dateTime(new Date(iso + "T12:00:00"), {
      day: "2-digit",
      month: "short",
    });

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="min-w-0 space-y-0.5">
          <CardTitle className="text-base font-medium">{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </div>
        <Link
          href="/obligations/taxes"
          className="text-primary hover:bg-accent inline-flex size-8 shrink-0 items-center justify-center rounded-md"
          aria-label={t("ctaAria")}
        >
          <ChevronRight className="size-4" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <ul className="space-y-3">
          {taxes.map((tax) => {
            const paid = paidMap[tax.id] ?? false;
            return (
              <li key={tax.id} className="flex items-start gap-2.5">
                <Checkbox
                  checked={paid}
                  onCheckedChange={(v) =>
                    setPaidMap((m) => ({
                      ...m,
                      [tax.id]: v === true,
                    }))
                  }
                  className="mt-0.5"
                  aria-label={t("togglePaid", {
                    name: t(`items.${tax.nameKey}`),
                  })}
                />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p
                    className={cn(
                      "text-sm leading-snug",
                      paid && "text-muted-foreground opacity-65",
                    )}
                  >
                    {t(`items.${tax.nameKey}`)}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      paid
                        ? "text-muted-foreground opacity-50"
                        : "text-muted-foreground",
                    )}
                  >
                    {t("dueLabel", { date: formatDue(tax.dueDate) })}
                  </p>
                </div>
                <span
                  className={cn(
                    "font-numeric shrink-0 text-sm font-medium",
                    paid && "text-muted-foreground line-through opacity-65",
                  )}
                >
                  {formatMoney(tax.amountCents)}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
