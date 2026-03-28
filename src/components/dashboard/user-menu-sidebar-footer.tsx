"use client";

import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColorThemePicker } from "@/components/color-theme-picker";
import { LocaleSwitcher } from "@/components/locale-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import type { ColorThemeId } from "@/config/color-themes";
import { mockUser } from "@/lib/mocks/dashboard";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

type UserMenuSidebarFooterProps = {
  initialColorTheme: ColorThemeId;
};

export function UserMenuSidebarFooter({
  initialColorTheme,
}: UserMenuSidebarFooterProps) {
  const t = useTranslations("Dashboard.userMenu");
  const tt = useTranslations("Dashboard.header.tooltips");
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed";

  const userTooltip = `${mockUser.fullName} · ${mockUser.email}`;

  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      <DropdownMenu>
        <Tooltip open={collapsed && !isMobile ? undefined : false}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "h-auto min-h-11 w-full items-center gap-2 py-2 text-left hover:bg-sidebar-accent",
                  collapsed ? "justify-center px-0" : "justify-start px-1.5",
                )}
                aria-label={tt("account")}
              >
                <Avatar className="size-8 shrink-0 overflow-hidden rounded-md after:hidden">
                  {mockUser.avatarUrl ? (
                    <AvatarImage
                      src={mockUser.avatarUrl}
                      alt=""
                      className="rounded-md"
                    />
                  ) : null}
                  <AvatarFallback className="rounded-md text-[11px] font-medium">
                    {initials(mockUser.fullName)}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate text-left text-sm font-semibold leading-none text-sidebar-foreground">
                      {mockUser.fullName}
                    </span>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            {userTooltip}
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-56" align="start" side="top" sideOffset={8}>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-2">
              <Avatar className="size-9 overflow-hidden rounded-md after:hidden">
                {mockUser.avatarUrl ? (
                  <AvatarImage
                    src={mockUser.avatarUrl}
                    alt=""
                    className="rounded-md"
                  />
                ) : null}
                <AvatarFallback className="rounded-md">
                  {initials(mockUser.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-sm font-medium text-foreground">
                  {mockUser.fullName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {mockUser.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            <UserRound className="size-4 opacity-70" />
            <span>{t("myAccount")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="gap-2">
            <LogOut className="size-4" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2 p-2">
            <ColorThemePicker initialTheme={initialColorTheme} />
            <LocaleSwitcher />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
