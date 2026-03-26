import {
  MEI_ANNUAL_REVENUE_CAP_CENTS,
  MEI_MINIMUM_WAGE_CENTS_JAN_2025,
  MEI_MINIMUM_WAGE_REFERENCE_ID,
} from "./params";
import type {
  MeiActivityKind,
  MeiDasBreakdownLine,
  MeiDasLineKey,
  MeiDasSuggestion,
  MeiDasWarning,
} from "./types";

/** Basis points: 100 = 1,00%. */
function portionFromMinimumWage(
  minimumWageCents: number,
  basisPoints: number,
): number {
  return Math.round((minimumWageCents * basisPoints) / 10_000);
}

const BPS_INSS = 500; // 5%
const BPS_ICMS = 100; // 1%
const BPS_ISS = 500; // 5%
const BPS_IPI = 50; // 0,5%

function linesForActivity(
  activity: MeiActivityKind,
  sm: number,
): MeiDasBreakdownLine[] {
  const out: MeiDasBreakdownLine[] = [];

  const push = (key: MeiDasLineKey, bps: number) => {
    const amountCents = portionFromMinimumWage(sm, bps);
    out.push({ key, amountCents });
  };

  push("inss", BPS_INSS);

  switch (activity) {
    case "commerce":
      push("icms", BPS_ICMS);
      break;
    case "services":
      push("iss", BPS_ISS);
      break;
    case "industry":
      push("ipi", BPS_IPI);
      push("icms", BPS_ICMS);
      break;
    case "commerce_services":
      push("icms", BPS_ICMS);
      push("iss", BPS_ISS);
      break;
  }

  return out;
}

export type SuggestMeiDasInput = {
  activityKind: MeiActivityKind;
  /** Salário mínimo em centavos (padrão: vigência atual em `params`). */
  minimumWageCents?: number;
  /** Faturamento acumulado no ano-calendário (centavos), opcional — só para alertas. */
  annualRevenueCents?: number | null;
  /** Teto MEI em centavos (padrão em `params`). */
  annualRevenueCapCents?: number;
};

/**
 * Sugestão mensal do valor do DAS MEI (soma das parcelas sobre o salário mínimo).
 * O DAS do MEI não varia com o faturamento mensal enquanto o MEI estiver enquadrado e abaixo do teto.
 */
export function suggestMeiDas({
  activityKind,
  minimumWageCents = MEI_MINIMUM_WAGE_CENTS_JAN_2025,
  annualRevenueCents,
  annualRevenueCapCents = MEI_ANNUAL_REVENUE_CAP_CENTS,
}: SuggestMeiDasInput): MeiDasSuggestion {
  const breakdown = linesForActivity(activityKind, minimumWageCents);
  const totalCents = breakdown.reduce((s, l) => s + l.amountCents, 0);

  const warnings: MeiDasWarning[] = [];
  if (
    annualRevenueCents != null &&
    annualRevenueCents > annualRevenueCapCents
  ) {
    warnings.push("annual_revenue_over_mei_cap");
  }

  return {
    totalCents,
    breakdown,
    minimumWageCents,
    minimumWageReferenceId: MEI_MINIMUM_WAGE_REFERENCE_ID,
    warnings,
  };
}
