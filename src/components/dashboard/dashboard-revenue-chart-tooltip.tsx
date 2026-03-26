import { formatCurrencyBRL } from "@/lib/format/currency";

/** Tooltip dos gráficos de faturamento (card do mês e faturamento anual). */
export function DashboardRevenueChartTooltip({
  monthLabel,
  valueCents,
}: {
  monthLabel: string;
  valueCents: number;
}) {
  return (
    <div className="rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
      <div className="text-muted-foreground">{monthLabel}</div>
      <div className="font-numeric font-medium tabular-nums">
        {formatCurrencyBRL(valueCents)}
      </div>
    </div>
  );
}
