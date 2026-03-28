"use client";

import * as React from "react";
import { Bell, HelpCircle, Search, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggleHeader } from "@/components/dashboard/mode-toggle-header";
import { SidebarTriggerTooltip } from "@/components/dashboard/sidebar-trigger-tooltip";

export function AppHeader() {
  const t = useTranslations("Dashboard.header");
  const tt = useTranslations("Dashboard.header.tooltips");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <div className="flex min-w-0 max-w-md flex-1 items-center gap-2">
        <SidebarTriggerTooltip />
        <div className="relative min-w-0 flex-1">
          <Input
            ref={searchInputRef}
            type="search"
            placeholder={t("searchPlaceholder")}
            className="h-9 min-w-0 w-full pr-10"
            aria-label={t("searchPlaceholder")}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0.5 -translate-y-1/2 shrink-0"
                aria-label={tt("search")}
                onClick={() => searchInputRef.current?.focus()}
              >
                <Search className="size-4" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tt("search")}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
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
              size="icon"
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
              size="icon"
              aria-label={t("invite")}
            >
              <UserPlus className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tt("invite")}</TooltipContent>
        </Tooltip>
        <ModeToggleHeader />
      </div>
    </header>
  );
}
