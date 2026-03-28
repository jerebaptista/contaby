"use client";

import {
  AlertCircle,
  Building2,
  Calculator,
  FileCheck,
  FileSpreadsheet,
  FolderOpen,
  LayoutDashboard,
  Receipt,
  Sparkles,
  SquarePen,
  UserCircle,
  Users,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import type { ColorThemeId } from "@/config/color-themes";
import { CompanySidebarHeader } from "@/components/dashboard/company-sidebar-header";
import { cn } from "@/lib/utils";
import { UserMenuSidebarFooter } from "@/components/dashboard/user-menu-sidebar-footer";

function usePathActive() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname === href || pathname.endsWith(href);
  };
}

type AppSidebarProps = {
  initialColorTheme: ColorThemeId;
};

export function AppSidebar({ initialColorTheme }: AppSidebarProps) {
  const t = useTranslations("Dashboard.nav");
  const tGroups = useTranslations("Dashboard.nav.groups");
  const tt = useTranslations("Dashboard.header.tooltips");
  const pathActive = usePathActive();
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-0 p-0">
        <CompanySidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/")}
                  tooltip={t("summary")}
                >
                  <Link href="/">
                    <LayoutDashboard />
                    <span>{t("summary")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      isActive={pathActive("/emit-invoice")}
                    >
                      <Link href="/emit-invoice">
                        <SquarePen />
                        <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                          <span className="truncate">{t("emitInvoice")}</span>
                          <span
                            className={cn(
                              "ml-auto shrink-0 text-xs font-medium text-muted-foreground",
                              "opacity-0 transition-opacity duration-150",
                              "group-hover/menu-button:opacity-100",
                              "group-data-[collapsible=icon]:hidden",
                            )}
                          >
                            {t("emitInvoiceShortcutKeys")}
                          </span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    hidden={state !== "collapsed" || isMobile}
                  >
                    <span>{t("emitInvoice")}</span>{" "}
                    <span className="font-medium text-muted-foreground">
                      {t("emitInvoiceShortcutKeys")}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{tGroups("financial")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/financial/revenue")}
                  tooltip={t("financial.revenue")}
                >
                  <Link href="/financial/revenue">
                    <Receipt />
                    <span>{t("financial.revenue")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/financial/movements")}
                  tooltip={t("financial.movements")}
                >
                  <Link href="/financial/movements">
                    <FileSpreadsheet />
                    <span>{t("financial.movements")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/financial/accounts")}
                  tooltip={t("financial.accounts")}
                >
                  <Link href="/financial/accounts">
                    <Building2 />
                    <span>{t("financial.accounts")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/financial/clients")}
                  tooltip={t("financial.clients")}
                >
                  <Link href="/financial/clients">
                    <UsersRound />
                    <span>{t("financial.clients")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{tGroups("obligations")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/obligations/taxes")}
                  tooltip={t("obligations.taxes")}
                >
                  <Link href="/obligations/taxes">
                    <Calculator />
                    <span>{t("obligations.taxes")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/obligations/declarations")}
                  tooltip={t("obligations.declarations")}
                >
                  <Link href="/obligations/declarations">
                    <FileCheck />
                    <span>{t("obligations.declarations")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/obligations/pending")}
                  tooltip={t("obligations.pending")}
                >
                  <Link href="/obligations/pending">
                    <AlertCircle />
                    <span>{t("obligations.pending")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{tGroups("team")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/team/employees")}
                  tooltip={t("team.employees")}
                >
                  <Link href="/team/employees">
                    <Users />
                    <span>{t("team.employees")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/team/partners")}
                  tooltip={t("team.partners")}
                >
                  <Link href="/team/partners">
                    <UserCircle />
                    <span>{t("team.partners")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{tGroups("company")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/company/registration")}
                  tooltip={t("company.registration")}
                >
                  <Link href="/company/registration">
                    <Building2 />
                    <span>{t("company.registration")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/company/reports")}
                  tooltip={t("company.reports")}
                >
                  <Link href="/company/reports">
                    <FileSpreadsheet />
                    <span>{t("company.reports")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/company/documents")}
                  tooltip={t("company.documents")}
                >
                  <Link href="/company/documents">
                    <FolderOpen />
                    <span>{t("company.documents")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathActive("/company/services")}
                  tooltip={t("company.services")}
                >
                  <Link href="/company/services">
                    <Sparkles />
                    <span>{t("company.services")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-0">
        <UserMenuSidebarFooter initialColorTheme={initialColorTheme} />
      </SidebarFooter>

      <SidebarRail
        tooltipExpand={tt("expandSidebar")}
        tooltipCollapse={tt("collapseSidebar")}
      />
    </Sidebar>
  );
}
