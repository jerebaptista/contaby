"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import type { ColorThemeId } from "@/config/color-themes";
import { AppHeader } from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ChatFab } from "@/components/dashboard/chat-fab";

type AppShellProps = {
  children: ReactNode;
  initialColorTheme: ColorThemeId;
};

export function AppShell({ children, initialColorTheme }: AppShellProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader initialColorTheme={initialColorTheme} />
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
          <ChatFab />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
