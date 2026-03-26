import { MEI_ANNUAL_REVENUE_CAP_CENTS } from "@/lib/tax/mei";

export type MonthlyRevenuePoint = {
  year: number;
  month: number;
  /** Centavos — faturamento de notas emitidas no mês. */
  valueCents: number;
};

/** Referência mensal (1/12 do teto anual MEI) para barra de progresso — não é limite legal mensal. */
export const MEI_MONTHLY_REFERENCE_CAP_CENTS = Math.round(
  MEI_ANNUAL_REVENUE_CAP_CENTS / 12,
);

/**
 * Últimos 3 meses (incluindo o mês de referência), em ordem cronológica.
 * Valores mockados estáveis para desenvolvimento.
 */
export function getMockRevenueLastThreeMonths(
  referenceDate: Date,
): MonthlyRevenuePoint[] {
  const valuesCents = [7_200_00, 8_100_00, 9_500_00];
  const points: MonthlyRevenuePoint[] = [];

  for (let i = 0; i < 3; i++) {
    const d = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() - (2 - i),
      1,
    );
    points.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      valueCents: valuesCents[i],
    });
  }

  return points;
}
