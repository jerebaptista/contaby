import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { DashboardDeclarationsCard } from "@/components/dashboard/dashboard-declarations-card";
import { DashboardMeiLimitCard } from "@/components/dashboard/dashboard-mei-limit-card";
import { DashboardRevenueCard } from "@/components/dashboard/dashboard-revenue-card";
import { DashboardRevenueYearChart } from "@/components/dashboard/dashboard-revenue-year-chart";
import { DashboardTaxesCard } from "@/components/dashboard/dashboard-taxes-card";
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
  const tNav = await getTranslations("Dashboard.nav");

  const now = new Date();
  const revenueSix = getMockRevenueLastSixMonths(now);
  const revenueYear = getMockRevenueCurrentYear(now);
  const currentMonth = revenueSix[revenueSix.length - 1];

  const isMei = mockCompany.regime === "mei";

  const firstName =
    mockUser.fullName.trim().split(/\s+/)[0] ?? mockUser.fullName;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("greeting", { name: firstName })}
        </h1>
        <Button
          size="lg"
          className="w-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground sm:w-auto"
          asChild
        >
          <Link href="/emit-invoice">{tNav("emitInvoice")}</Link>
        </Button>
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
    </div>
  );
}
