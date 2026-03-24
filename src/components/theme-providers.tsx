"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

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
    </ThemeProvider>
  );
}
