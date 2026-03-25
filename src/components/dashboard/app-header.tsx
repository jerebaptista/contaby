"use client";

import { Bell, HelpCircle, Search, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ColorThemeId } from "@/config/color-themes";
import { ModeToggleHeader } from "@/components/dashboard/mode-toggle-header";
import { SidebarTriggerTooltip } from "@/components/dashboard/sidebar-trigger-tooltip";
import { UserMenuHeader } from "@/components/dashboard/user-menu-header";

type AppHeaderProps = {
  initialColorTheme: ColorThemeId;
};

export function AppHeader({ initialColorTheme }: AppHeaderProps) {
  const t = useTranslations("Dashboard.header");
  const tt = useTranslations("Dashboard.header.tooltips");

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <div className="flex min-w-0 max-w-md flex-1 items-center gap-2">
        <SidebarTriggerTooltip />
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="h-9 pl-9"
            aria-label={t("searchPlaceholder")}
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t("notifications")}
            >
              <Bell className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tt("notifications")}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t("help")}
            >
              <HelpCircle className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tt("help")}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t("invite")}
            >
              <UserPlus className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tt("invite")}</TooltipContent>
        </Tooltip>
        <ModeToggleHeader />
        <UserMenuHeader initialColorTheme={initialColorTheme} />
      </div>
    </header>
  );
}
