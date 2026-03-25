/** English URL segments; labels come from i18n. */
export const DASHBOARD_SECTION_PATHS = [
  "financial/revenue",
  "financial/billing",
  "financial/movements",
  "financial/accounts",
  "obligations/taxes",
  "obligations/declarations",
  "obligations/pending",
  "team/employees",
  "team/partners",
  "company/registration",
  "company/reports",
  "company/documents",
  "company/services",
] as const;

export type DashboardSectionPath = (typeof DASHBOARD_SECTION_PATHS)[number];

const allowed = new Set<string>(DASHBOARD_SECTION_PATHS);

export function isDashboardSectionPath(segments: string[]): boolean {
  return allowed.has(segments.join("/"));
}
