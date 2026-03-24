"use client";

import { useTranslations } from "next-intl";
import {
  COLOR_THEME_IDS,
  isColorThemeId,
  type ColorThemeId,
} from "@/config/color-themes";
import { applyColorTheme } from "@/lib/color-theme-cookie";

type ColorThemePickerProps = {
  initialTheme: ColorThemeId;
};

export function ColorThemePicker({ initialTheme }: ColorThemePickerProps) {
  const t = useTranslations("ColorTheme");

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{t("label")}</span>
      <select
        name="color-theme"
        defaultValue={initialTheme}
        onChange={(e) => {
          const value = e.target.value;
          if (isColorThemeId(value)) applyColorTheme(value);
        }}
        className="rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground shadow-xs"
      >
        {COLOR_THEME_IDS.map((id) => (
          <option key={id} value={id}>
            {t(`themes.${id}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
