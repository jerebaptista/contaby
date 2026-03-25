"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ModeToggleHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("Appearance");
  const tt = useTranslations("Dashboard.header.tooltips");

  if (resolvedTheme === undefined) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" disabled aria-hidden>
            <Sun className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{tt("mode")}</TooltipContent>
      </Tooltip>
    );
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? t("light") : t("dark");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={label}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}
