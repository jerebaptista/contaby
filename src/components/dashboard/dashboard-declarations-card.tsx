"use client";

import * as React from "react";
import { Check, ChevronRight, Upload } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardDeclarationMock } from "@/lib/mocks/dashboard-home";

type DashboardDeclarationsCardProps = {
  declarations: DashboardDeclarationMock[];
};

export function DashboardDeclarationsCard({
  declarations,
}: DashboardDeclarationsCardProps) {
  const t = useTranslations("Dashboard.home.declarationsCard");
  const format = useFormatter();
  const [files, setFiles] = React.useState<Record<string, string>>({});

  const formatDue = (iso: string) =>
    format.dateTime(new Date(iso + "T12:00:00"), {
      day: "2-digit",
      month: "short",
    });

  function onPickFile(id: string, list: FileList | null) {
    const f = list?.[0];
    if (f) setFiles((prev) => ({ ...prev, [id]: f.name }));
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="min-w-0 space-y-0.5">
          <CardTitle className="text-base font-medium">{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </div>
        <Link
          href="/obligations/declarations"
          className="text-primary hover:bg-accent inline-flex size-8 shrink-0 items-center justify-center rounded-md"
          aria-label={t("ctaAria")}
        >
          <ChevronRight className="size-4" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <ul className="space-y-3">
          {declarations.map((row) => {
            const sent = Boolean(files[row.id]);
            const fileName = files[row.id];
            return (
              <li key={row.id} className="flex items-start gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  {sent ? (
                    <span className="text-primary">
                      <Check className="size-5" strokeWidth={2.5} aria-hidden />
                    </span>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) =>
                          onPickFile(row.id, e.target.files)
                        }
                      />
                      <span
                        className={cn(
                          "border-input bg-background hover:bg-accent/50 inline-flex size-8 items-center justify-center rounded-md border shadow-xs transition-colors",
                        )}
                      >
                        <Upload className="text-muted-foreground size-4" aria-hidden />
                      </span>
                    </label>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-sm leading-snug">
                    {t(`items.${row.nameKey}`)}
                  </p>
                  {sent && fileName ? (
                    <p className="text-muted-foreground text-xs">{fileName}</p>
                  ) : (
                    <p className="text-muted-foreground text-xs">
                      {t("dueLabel", { date: formatDue(row.dueDate) })}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
