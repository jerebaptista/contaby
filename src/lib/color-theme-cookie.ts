import type { ColorThemeId } from "@/config/color-themes";
import { COLOR_THEME_COOKIE } from "@/config/color-themes";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function applyColorTheme(theme: ColorThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-color-theme", theme);
  document.cookie = `${COLOR_THEME_COOKIE}=${encodeURIComponent(theme)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}
