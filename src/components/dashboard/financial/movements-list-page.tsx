"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  BadgePercent,
  Briefcase,
  CalendarIcon,
  CreditCard,
  Landmark,
  Pencil,
  ShoppingBag,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MOCK_MOVEMENTS,
  MOVEMENT_CATEGORY_IDS,
  type MockMovement,
  type MovementCategoryId,
} from "@/lib/mocks/movements";
import { cn } from "@/lib/utils";
import { DataTableSortHeader } from "@/components/dashboard/financial/data-table-sort-header";

const columnHelper = createColumnHelper<MockMovement>();

const CATEGORY_ICONS: Record<MovementCategoryId, LucideIcon> = {
  taxes: BadgePercent,
  transfer: ArrowLeftRight,
  groceries: ShoppingCart,
  purchases: ShoppingBag,
  bills: Zap,
  services: Briefcase,
};

const CARD_ACCOUNT_PATTERN =
  /\b(mastercard|visa|elo|amex|hipercard|discover)\b/i;

function accountUsesCardIcon(accountLabel: string) {
  return CARD_ACCOUNT_PATTERN.test(accountLabel);
}

function formatAmountBRL(
  cents: number,
  formatter: Intl.NumberFormat,
): string {
  return formatter.format(cents / 100);
}

function movementMatchesSearch(
  row: MockMovement,
  query: string,
  formatter: Intl.NumberFormat,
): boolean {
  const q = query.trim();
  if (!q) return true;
  if (row.description.toLowerCase().includes(q.toLowerCase())) return true;
  const fmt = formatAmountBRL(row.amountCents, formatter).toLowerCase();
  const qCompact = q.toLowerCase().replace(/\s/g, "");
  if (qCompact && fmt.replace(/\s/g, "").includes(qCompact)) return true;
  const numericTest = q.replace(/[^\d,-]/g, "").replace(",", ".");
  const parsed = Number.parseFloat(numericTest);
  if (Number.isFinite(parsed)) {
    const reais = row.amountCents / 100;
    if (Math.abs(reais - parsed) < 0.01) return true;
  }
  const qDigits = q.replace(/\D/g, "");
  if (
    qDigits.length >= 2 &&
    String(Math.abs(row.amountCents)).includes(qDigits)
  ) {
    return true;
  }
  return false;
}

function movementInDateRange(
  row: MockMovement,
  range: DateRange | undefined,
): boolean {
  if (!range?.from) return true;
  const fromStr = format(range.from, "yyyy-MM-dd");
  const end = range.to ?? range.from;
  const toStr = format(end, "yyyy-MM-dd");
  return row.date >= fromStr && row.date <= toStr;
}

export function MovementsListPage() {
  const t = useTranslations("Dashboard.movements");
  const locale = useLocale();
  const dateLocale = locale.startsWith("pt") ? ptBR : enUS;
  const datePattern = locale.startsWith("pt") ? "dd/MM/yyyy" : "MM/dd/yyyy";

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [search, setSearch] = React.useState("");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [accountFilter, setAccountFilter] = React.useState("all");

  const money = React.useMemo(
    () =>
      new Intl.NumberFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: "BRL",
      }),
    [locale],
  );

  const accountOptions = React.useMemo(() => {
    const set = new Set(MOCK_MOVEMENTS.map((r) => r.account));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredRows = React.useMemo(() => {
    return MOCK_MOVEMENTS.filter((row) => {
      if (!movementMatchesSearch(row, search, money)) return false;
      if (!movementInDateRange(row, dateRange)) return false;
      if (categoryFilter !== "all" && row.categoryId !== categoryFilter) {
        return false;
      }
      if (accountFilter !== "all" && row.account !== accountFilter) {
        return false;
      }
      return true;
    });
  }, [search, dateRange, categoryFilter, accountFilter, money]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("date", {
        header: t("columns.date"),
        sortingFn: (rowA, rowB, columnId) =>
          String(rowA.getValue(columnId)).localeCompare(
            String(rowB.getValue(columnId)),
          ),
        cell: (info) => (
          <span className="text-muted-foreground tabular-nums">
            {format(parseISO(info.getValue()), datePattern, { locale: dateLocale })}
          </span>
        ),
      }),
      columnHelper.accessor("description", {
        header: t("columns.description"),
        cell: (info) => (
          <p className="max-w-md whitespace-normal leading-snug">
            {info.getValue()}
          </p>
        ),
      }),
      columnHelper.accessor("categoryId", {
        header: t("columns.category"),
        cell: (info) => {
          const id = info.getValue() as MovementCategoryId;
          const Icon = CATEGORY_ICONS[id];
          return (
            <span className="inline-flex max-w-xs items-center gap-2 whitespace-normal leading-snug">
              <Icon
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span>{t(`categories.${id}`)}</span>
            </span>
          );
        },
      }),
      columnHelper.accessor("account", {
        header: t("columns.account"),
        cell: (info) => {
          const label = info.getValue();
          const isCard = accountUsesCardIcon(label);
          const Icon = isCard ? CreditCard : Landmark;
          return (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Icon
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span className="tabular-nums">{label}</span>
            </span>
          );
        },
      }),
      columnHelper.accessor("amountCents", {
        header: t("columns.amount"),
        cell: (info) => {
          const cents = info.getValue();
          const formatted = money.format(cents / 100);
          return (
            <span
              className={cn(
                "tabular-nums font-medium",
                cents < 0 && "text-destructive",
              )}
            >
              {formatted}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        enableSorting: false,
        header: () => (
          <span className="block w-full pr-2 text-right">{t("columns.actions")}</span>
        ),
        cell: () => (
          <div className="flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label={t("edit")}
                  onClick={() => toast.message(t("actionSoon"))}
                >
                  <Pencil className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{t("edit")}</TooltipContent>
            </Tooltip>
          </div>
        ),
      }),
    ],
    [t, money, dateLocale, datePattern],
  );

  const table = useReactTable({
    data: filteredRows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
          <Button variant="secondary" size="lg" className="h-11 px-6" asChild>
            <Link href="/financial/accounts">{t("accountsCta")}</Link>
          </Button>
          <Button
            type="button"
            size="lg"
            className="h-11 px-6"
            onClick={() => toast.message(t("actionSoon"))}
          >
            {t("sendStatement")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-1.5 lg:col-span-4">
          <Label htmlFor="movements-search">{t("filters.search")}</Label>
          <Input
            id="movements-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            aria-label={t("filters.searchPlaceholder")}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-3">
          <span className="text-sm font-medium">{t("filters.period")}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "h-9 w-full justify-start font-normal",
                  !dateRange?.from && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 size-4 shrink-0" aria-hidden />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, datePattern, {
                        locale: dateLocale,
                      })}{" "}
                      –{" "}
                      {format(dateRange.to, datePattern, {
                        locale: dateLocale,
                      })}
                    </>
                  ) : (
                    format(dateRange.from, datePattern, { locale: dateLocale })
                  )
                ) : (
                  <span>{t("filters.periodPlaceholder")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={locale.startsWith("pt") ? 2 : 1}
                defaultMonth={dateRange?.from}
                locale={dateLocale}
              />
              {dateRange?.from ? (
                <div className="border-t p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setDateRange(undefined)}
                  >
                    {t("filters.clearPeriod")}
                  </Button>
                </div>
              ) : null}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <Label htmlFor="movements-category">{t("filters.category")}</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="movements-category" className="h-9 w-full">
              <SelectValue placeholder={t("filters.allCategories")} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
              {MOVEMENT_CATEGORY_IDS.map((id) => (
                <SelectItem key={id} value={id}>
                  {t(`categories.${id}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-3">
          <Label htmlFor="movements-account">{t("filters.account")}</Label>
          <Select value={accountFilter} onValueChange={setAccountFilter}>
            <SelectTrigger id="movements-account" className="h-9 w-full">
              <SelectValue placeholder={t("filters.allAccounts")} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">{t("filters.allAccounts")}</SelectItem>
              {accountOptions.map((acc) => (
                <SelectItem key={acc} value={acc}>
                  {acc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.column.getCanSort() && "group/sort-head",
                      header.column.id === "actions" && "text-right",
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <DataTableSortHeader
                        header={header}
                        className={cn(
                          header.column.id === "actions" &&
                            "ml-auto w-full justify-end",
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </DataTableSortHeader>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="text-muted-foreground h-24 text-center"
                >
                  {t("empty")}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id === "actions" && "text-right",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
