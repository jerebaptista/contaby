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
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CompanySidebarHeader } from "@/components/dashboard/company-sidebar-header";

function usePathActive() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname === href || pathname.endsWith(href);
  };
}

export function AppSidebar() {
  const t = useTranslations("Dashboard.nav");
  const tGroups = useTranslations("Dashboard.nav.groups");
  const tt = useTranslations("Dashboard.header.tooltips");
  const pathActive = usePathActive();

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
                  tooltip={t("emitInvoice")}
                  className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                >
                  <Link href="/emit-invoice">
                    <Receipt />
                    <span>{t("emitInvoice")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

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
                  isActive={pathActive("/financial/billing")}
                  tooltip={t("financial.billing")}
                >
                  <Link href="/financial/billing">
                    <Wallet />
                    <span>{t("financial.billing")}</span>
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

      <SidebarRail
        tooltipExpand={tt("expandSidebar")}
        tooltipCollapse={tt("collapseSidebar")}
      />
    </Sidebar>
  );
}
