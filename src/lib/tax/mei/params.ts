/**
 * Parâmetros de referência para simulação MEI.
 * Atualizar `minimumWageCents` e `annualRevenueCapCents` quando mudar SM / teto legal.
 *
 * Composição do DAS MEI: percentuais incidentes sobre o salário mínimo (LC nº 128/2008 e alterações).
 * Fonte de consulta: Portal do Empreendedor / Receita Federal.
 */

/** Salário mínimo nacional vigente a partir de jan/2025 (R$ 1.518,00). */
export const MEI_MINIMUM_WAGE_CENTS_JAN_2025 = 151_800;

/** Teto de receita bruta anual do MEI (ano-calendário; valor típico — conferir legislação vigente). */
export const MEI_ANNUAL_REVENUE_CAP_CENTS = 8_100_000;

export const MEI_MINIMUM_WAGE_REFERENCE_ID = "2025-01";
