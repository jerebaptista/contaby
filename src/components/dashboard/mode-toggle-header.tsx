"use client";

import * as React from "react";
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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Evita mismatch de hidratação: servidor e 1º render no cliente usam o mesmo placeholder.
  if (!mounted) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={tt("mode")}
          >
            <Sun className="size-4" aria-hidden />
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
          size="icon"
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
