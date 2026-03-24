import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16">
      <div className="max-w-lg text-center space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("subtitle")}
        </p>
      </div>
      <Button type="button" variant="default" disabled>
        {t("cta")}
      </Button>
    </main>
  );
}
