"use client";

import { useTranslations } from "next-intl";
import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarTriggerTooltip() {
  const tt = useTranslations("Dashboard.header.tooltips");
  const { state, isMobile, openMobile } = useSidebar();

  const showExpand = isMobile ? !openMobile : state === "collapsed";
  const label = showExpand ? tt("expandSidebar") : tt("collapseSidebar");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger aria-label={label} />
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}
