import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardHomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardHomePage({ params }: DashboardHomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.home");

  const cardIds = [
    "revenue",
    "taxes",
    "obligations",
    "cashflow",
    "alerts",
    "recent",
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cardIds.map((id) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle className="text-base">{t(`cards.${id}.title`)}</CardTitle>
              <CardDescription>{t(`cards.${id}.description`)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/40 flex min-h-[120px] items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
                {t("cards.empty")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
