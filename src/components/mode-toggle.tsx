"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("Appearance");

  if (theme === undefined) {
    return (
      <Button type="button" variant="outline" size="icon-sm" disabled aria-hidden>
        <Sun className="size-4" />
      </Button>
    );
  }

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const Icon =
    theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;
  const label =
    theme === "system"
      ? t("system")
      : theme === "dark"
        ? t("dark")
        : t("light");

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={cycle}
      title={label}
      aria-label={label}
    >
      <Icon className="size-4" />
    </Button>
  );
}
