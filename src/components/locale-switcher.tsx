"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{t("label")}</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value;
          startTransition(() => {
            router.replace(pathname, { locale: next });
          });
        }}
        className="rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground shadow-xs"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc as "pt-BR" | "en")}
          </option>
        ))}
      </select>
    </label>
  );
}
