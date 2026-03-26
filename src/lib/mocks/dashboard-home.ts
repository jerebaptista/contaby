import type { MonthlyRevenuePoint } from "@/lib/mocks/dashboard-revenue";
import { MEI_MONTHLY_REFERENCE_CAP_CENTS } from "@/lib/mocks/dashboard-revenue";

export type DashboardTaxMock = {
  id: string;
  /** Chave em Dashboard.home.taxes.items */
  nameKey: string;
  amountCents: number;
  /** ISO date string (YYYY-MM-DD) */
  dueDate: string;
};

export type DashboardDeclarationMock = {
  id: string;
  nameKey: string;
  /** ISO date */
  dueDate: string;
};

/** Últimos 6 meses (incluindo o mês de referência), ordem cronológica. */
export function getMockRevenueLastSixMonths(
  referenceDate: Date,
): MonthlyRevenuePoint[] {
  /** Penúltimo / último: +20% entre meses; último ≈60% da referência mensal MEI (mock alinhado ao faturamento). */
  const valuesCents = [
    6_800_00, 7_200_00, 8_100_00, 9_200_00, 3_375_00, 4_050_00,
  ];
  const points: MonthlyRevenuePoint[] = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() - (5 - i),
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

/** Meses do ano civil corrente — faturamento mock (notas emitidas), um ponto por mês. */
export function getMockRevenueCurrentYear(
  referenceDate: Date,
): MonthlyRevenuePoint[] {
  const y = referenceDate.getFullYear();
  /** Ondas: fundamental (1 ciclo/ano) + harmônico (2 ciclos) para picos e vales alternados. */
  return Array.from({ length: 12 }, (_, i) => {
    const w1 = Math.sin((2 * Math.PI * i) / 12);
    const w2 = Math.sin((4 * Math.PI * i) / 12);
    const center = 7_500_00;
    const valueCents = Math.round(
      center + 2_400_00 * w1 + 1_000_00 * w2,
    );
    return {
      year: y,
      month: i + 1,
      valueCents,
    };
  });
}

export function percentChangeVsPreviousMonth(
  series: MonthlyRevenuePoint[],
): number | null {
  if (series.length < 2) return null;
  const prev = series[series.length - 2].valueCents;
  const cur = series[series.length - 1].valueCents;
  if (prev === 0) return null;
  return ((cur - prev) / prev) * 100;
}

/** Impostos típicos exibidos para teste (MEI). */
export const MEI_DASHBOARD_TAXES: DashboardTaxMock[] = [
  {
    id: "das-mei",
    nameKey: "dasMei",
    amountCents: 91_08,
    dueDate: "2025-03-20",
  },
  {
    id: "iss",
    nameKey: "issMunicipal",
    amountCents: 75_90,
    dueDate: "2025-03-10",
  },
  {
    id: "taxa",
    nameKey: "licenseFee",
    amountCents: 45_00,
    dueDate: "2025-03-05",
  },
];

export const MEI_DASHBOARD_DECLARATIONS: DashboardDeclarationMock[] = [
  {
    id: "dasn",
    nameKey: "dasnSimei",
    dueDate: "2025-05-31",
  },
  {
    id: "annual",
    nameKey: "annualRevenueDecl",
    dueDate: "2025-05-31",
  },
];

export { MEI_MONTHLY_REFERENCE_CAP_CENTS };
