import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { AppShell } from "@/components/dashboard/app-shell";
import {
  COLOR_THEME_COOKIE,
  DEFAULT_COLOR_THEME,
  isColorThemeId,
} from "@/config/color-themes";

type AppLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const colorCookie = cookieStore.get(COLOR_THEME_COOKIE)?.value;
  const initialColorTheme = isColorThemeId(colorCookie)
    ? colorCookie
    : DEFAULT_COLOR_THEME;

  return (
    <AppShell initialColorTheme={initialColorTheme}>{children}</AppShell>
  );
}
