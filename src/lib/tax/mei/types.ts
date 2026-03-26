export type MeiActivityKind =
  | "commerce"
  | "services"
  | "industry"
  | "commerce_services";

export type MeiDasLineKey = "inss" | "icms" | "iss" | "ipi";

export type MeiDasBreakdownLine = {
  key: MeiDasLineKey;
  amountCents: number;
};

export type MeiDasSuggestion = {
  totalCents: number;
  breakdown: MeiDasBreakdownLine[];
  minimumWageCents: number;
  /** Ex.: "2025-01" (vigência do salário mínimo usado). */
  minimumWageReferenceId: string;
  warnings: MeiDasWarning[];
};

export type MeiDasWarning = "annual_revenue_over_mei_cap";
