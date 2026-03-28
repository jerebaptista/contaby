import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isDashboardSectionPath } from "@/config/app-nav-paths";
import { InvoicesListPage } from "@/components/dashboard/financial/invoices-list-page";
import { MovementsListPage } from "@/components/dashboard/financial/movements-list-page";
import { AccountsListPage } from "@/components/dashboard/financial/accounts-list-page";
import { ClientsListPage } from "@/components/dashboard/financial/clients-list-page";

type SectionPageProps = {
  params: Promise<{ locale: string; path: string[] }>;
};

export default async function DashboardSectionPage({ params }: SectionPageProps) {
  const { locale, path } = await params;
  setRequestLocale(locale);

  if (!isDashboardSectionPath(path)) {
    notFound();
  }

  const pathKey = path.join("_");

  if (pathKey === "financial_revenue") {
    return <InvoicesListPage />;
  }

  if (pathKey === "financial_movements") {
    return <MovementsListPage />;
  }

  if (pathKey === "financial_accounts") {
    return <AccountsListPage />;
  }

  if (pathKey === "financial_clients") {
    return <ClientsListPage />;
  }

  const t = await getTranslations("Dashboard.placeholder");

  const titleByKey: Record<string, string> = {
    financial_revenue: t("titles.financial_revenue"),
    financial_movements: t("titles.financial_movements"),
    financial_accounts: t("titles.financial_accounts"),
    financial_clients: t("titles.financial_clients"),
    obligations_taxes: t("titles.obligations_taxes"),
    obligations_declarations: t("titles.obligations_declarations"),
    obligations_pending: t("titles.obligations_pending"),
    team_employees: t("titles.team_employees"),
    team_partners: t("titles.team_partners"),
    company_registration: t("titles.company_registration"),
    company_reports: t("titles.company_reports"),
    company_documents: t("titles.company_documents"),
    company_services: t("titles.company_services"),
  };

  const title = titleByKey[pathKey] ?? pathKey;

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{t("body")}</p>
    </div>
  );
}
