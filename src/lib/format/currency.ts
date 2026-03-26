/** Formata centavos em BRL (pt-BR). */
export function formatCurrencyBRL(valueCents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueCents / 100);
}
