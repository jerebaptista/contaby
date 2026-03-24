export const COLOR_THEME_IDS = [
  "neutral",
  "blue",
  "green",
  "orange",
  "red",
  "rose",
  "violet",
  "yellow",
] as const;

export type ColorThemeId = (typeof COLOR_THEME_IDS)[number];

export function isColorThemeId(value: string | undefined | null): value is ColorThemeId {
  return !!value && COLOR_THEME_IDS.includes(value as ColorThemeId);
}

export const COLOR_THEME_COOKIE = "contaby-color-theme";

export const DEFAULT_COLOR_THEME: ColorThemeId = "neutral";
