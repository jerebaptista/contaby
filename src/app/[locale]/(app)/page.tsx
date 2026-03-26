import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardDeclarationsCard } from "@/components/dashboard/dashboard-declarations-card";
import { DashboardMeiLimitCard } from "@/components/dashboard/dashboard-mei-limit-card";
import { DashboardRevenueCard } from "@/components/dashboard/dashboard-revenue-card";
import { DashboardRevenueYearChart } from "@/components/dashboard/dashboard-revenue-year-chart";
import { DashboardTaxesCard } from "@/components/dashboard/dashboard-taxes-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getMockRevenueCurrentYear,
  getMockRevenueLastSixMonths,
  MEI_DASHBOARD_DECLARATIONS,
  MEI_DASHBOARD_TAXES,
} from "@/lib/mocks/dashboard-home";
import { MEI_MONTHLY_REFERENCE_CAP_CENTS } from "@/lib/mocks/dashboard-revenue";
import { mockCompany, mockUser } from "@/lib/mocks/dashboard";

type DashboardHomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardHomePage({ params }: DashboardHomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.home");

  const cardIds = ["cashflow", "alerts", "recent"] as const;

  const now = new Date();
  const revenueSix = getMockRevenueLastSixMonths(now);
  const revenueYear = getMockRevenueCurrentYear(now);
  const currentMonth = revenueSix[revenueSix.length - 1];

  const isMei = mockCompany.regime === "mei";

  const firstName =
    mockUser.fullName.trim().split(/\s+/)[0] ?? mockUser.fullName;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("greeting", { name: firstName })}
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <DashboardRevenueCard series={revenueSix} />
          {isMei ? (
            <DashboardMeiLimitCard
              currentMonthCents={currentMonth.valueCents}
              limitCents={MEI_MONTHLY_REFERENCE_CAP_CENTS}
            />
          ) : null}
        </div>
        <DashboardTaxesCard taxes={MEI_DASHBOARD_TAXES} />
        <DashboardDeclarationsCard declarations={MEI_DASHBOARD_DECLARATIONS} />
      </div>

      <DashboardRevenueYearChart series={revenueYear} />

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
