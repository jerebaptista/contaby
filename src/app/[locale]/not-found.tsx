import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24">
      <p className="text-muted-foreground">{t("message")}</p>
      <Link href="/" className="text-sm underline underline-offset-4">
        {t("home")}
      </Link>
    </main>
  );
}
