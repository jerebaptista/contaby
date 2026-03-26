"use client";

import * as React from "react";
import {
  ArrowLeftRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  IdCard,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import {
  formatCnpj,
  mockCompanies,
  mockCompany,
  type MockCompany,
} from "@/lib/mocks/dashboard";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function digitsOnlyCnpj(cnpjDigits: string) {
  return cnpjDigits.replace(/\D/g, "");
}

export function CompanySidebarHeader() {
  const t = useTranslations("Dashboard.companyMenu");
  const tt = useTranslations("Dashboard.header.tooltips");
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const [active, setActive] = React.useState<MockCompany>(mockCompany);
  const [cnpjCopied, setCnpjCopied] = React.useState(false);
  const copyResetRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
    };
  }, []);

  React.useEffect(() => {
    setCnpjCopied(false);
    if (copyResetRef.current) {
      clearTimeout(copyResetRef.current);
      copyResetRef.current = null;
    }
  }, [active.id]);

  const companyTooltip = `${active.tradeName} · ${formatCnpj(active.cnpjDigits)}`;

  function handleCopyCnpj(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const digits = digitsOnlyCnpj(active.cnpjDigits);
    void navigator.clipboard.writeText(digits).then(() => {
      setCnpjCopied(true);
      toast.success(t("cnpjCopiedToast"), {
        closeButton: false,
        richColors: false,
        className:
          "border border-neutral-200 bg-white !text-neutral-900 shadow-sm dark:border-neutral-200 dark:bg-white dark:!text-neutral-900 [&_[data-icon]]:!text-neutral-600",
        icon: <Check className="size-4 shrink-0 text-neutral-600" aria-hidden />,
      });
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => {
        setCnpjCopied(false);
        copyResetRef.current = null;
      }, 2000);
    });
  }

  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      <DropdownMenu>
        <Tooltip open={collapsed && !isMobile ? undefined : false}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "h-auto w-full gap-2 py-1.5 text-left hover:bg-sidebar-accent",
                  collapsed ? "justify-center px-0" : "justify-start px-1.5",
                )}
                aria-label={tt("company")}
              >
                <Avatar className="size-8 rounded-md" size="default">
                  {active.logoUrl ? (
                    <AvatarImage src={active.logoUrl} alt="" />
                  ) : null}
                  <AvatarFallback className="rounded-md text-[11px] font-medium">
                    {initials(active.tradeName)}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="min-w-0 flex-1 text-left leading-tight">
                      <p className="truncate text-[13px] font-medium text-sidebar-foreground">
                        {active.tradeName}
                      </p>
                      <p className="truncate text-[11px] text-sidebar-foreground/70">
                        {formatCnpj(active.cnpjDigits)}
                      </p>
                    </div>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            {companyTooltip}
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-56" align="start" side="bottom">
          <DropdownMenuLabel className="font-normal text-popover-foreground">
            <div className="flex items-center gap-2 pr-1">
              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {active.tradeName}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {formatCnpj(active.cnpjDigits)}
                </span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={handleCopyCnpj}
                    aria-label={t("copyCnpj")}
                  >
                    {cnpjCopied ? (
                      <Check className="size-3.5 text-green-600 dark:text-green-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  {t("copyCnpj")}
                </TooltipContent>
              </Tooltip>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            <IdCard className="size-4 opacity-70" />
            <span>{t("companyData")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Sparkles className="size-4 opacity-70" />
            <span>{t("changePlan")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <CreditCard className="size-4 opacity-70" />
            <span>{t("billing")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Bell className="size-4 opacity-70" />
            <span>{t("notifications")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Settings className="size-4 opacity-70" />
            <span>{t("settings")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <ArrowLeftRight className="size-4 opacity-70" />
              <span>{t("switchCompany")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              {mockCompanies.map((c) => (
                <DropdownMenuItem
                  key={c.id}
                  onClick={() => setActive(c)}
                  className={cn(
                    "items-start gap-2 py-1.5",
                    c.id === active.id && "bg-accent",
                  )}
                >
                  <Building2 className="mt-0.5 size-4 shrink-0 opacity-70" />
                  <div className="min-w-0 flex-1">
                    <span className="block truncate leading-tight">
                      {c.tradeName}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground tabular-nums">
                      {formatCnpj(c.cnpjDigits)}
                    </span>
                  </div>
                  <span
                    className="mt-0.5 flex w-4 shrink-0 justify-center"
                    aria-hidden
                  >
                    {c.id === active.id ? (
                      <Check className="size-4" />
                    ) : null}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Plus className="size-4 opacity-70" />
                <span>{t("newCompany")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
