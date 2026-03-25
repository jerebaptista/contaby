"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

type ThemeProvidersProps = {
  children: ReactNode;
};

export function ThemeProviders({ children }: ThemeProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster position="top-center" richColors closeButton />
    </ThemeProvider>
  );
}
