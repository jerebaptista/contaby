"use client";

import { LogOut, UserRound } from "lucide-react";
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
import type { ColorThemeId } from "@/config/color-themes";
import { mockUser } from "@/lib/mocks/dashboard";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

type UserMenuHeaderProps = {
  initialColorTheme: ColorThemeId;
};

export function UserMenuHeader({ initialColorTheme }: UserMenuHeaderProps) {
  const t = useTranslations("Dashboard.userMenu");

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-8 rounded-full p-0">
              <Avatar className="size-8">
                {mockUser.avatarUrl ? (
                  <AvatarImage src={mockUser.avatarUrl} alt="" />
                ) : null}
                <AvatarFallback className="text-xs">
                  {initials(mockUser.fullName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">{t("myAccount")}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-2">
            <Avatar className="size-9">
              {mockUser.avatarUrl ? (
                <AvatarImage src={mockUser.avatarUrl} alt="" />
              ) : null}
              <AvatarFallback>{initials(mockUser.fullName)}</AvatarFallback>
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
  );
}
