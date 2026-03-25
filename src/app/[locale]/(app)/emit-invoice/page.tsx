import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EmitInvoicePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function EmitInvoicePage({ params }: EmitInvoicePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.emitInvoice");

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("cardTitle")}</CardTitle>
          <CardDescription>{t("cardDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">{t("hint")}</p>
          <Button type="button" variant="outline" asChild>
            <a
              href="https://www8.receita.fazenda.gov.br/SimplesNacional/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("openEmitter")}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
