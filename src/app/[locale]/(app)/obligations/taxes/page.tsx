import { getTranslations, setRequestLocale } from "next-intl/server";
import { MeiDasEstimator } from "@/components/tax/mei-das-estimator";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ObligationsTaxesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.meiDas");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("pageTitle")}</h1>
        <p className="text-muted-foreground text-sm">{t("pageSubtitle")}</p>
      </div>
      <MeiDasEstimator />
    </div>
  );
}
