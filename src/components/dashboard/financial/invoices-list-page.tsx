"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import { Download, Eye } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { formatCnpj } from "@/lib/mocks/dashboard";
import {
  filterInvoicesByTomadorQuery,
  MOCK_ISSUED_INVOICES,
  splitInvoiceNumberForDisplay,
  type MockIssuedInvoice,
} from "@/lib/mocks/invoices";
import { cn } from "@/lib/utils";
import { DataTableSortHeader } from "@/components/dashboard/financial/data-table-sort-header";

const columnHelper = createColumnHelper<MockIssuedInvoice>();

function parseInvoiceNumber(raw: string) {
  return Number.parseInt(raw.replace(/\D/g, "") || "0", 10);
}

export function InvoicesListPage() {
  const t = useTranslations("Dashboard.invoices");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const dateLocale = locale.startsWith("pt") ? ptBR : enUS;
  const datePattern = locale.startsWith("pt") ? "dd/MM/yyyy" : "MM/dd/yyyy";

  const [search, setSearch] = React.useState("");
  const appliedUrlSearch = React.useRef(false);
  const qParam = searchParams.get("q");

  React.useEffect(() => {
    if (appliedUrlSearch.current) return;
    if (qParam) {
      setSearch(qParam);
      appliedUrlSearch.current = true;
    }
  }, [qParam]);
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "number", desc: false },
  ]);

  const filtered = React.useMemo(
    () => filterInvoicesByTomadorQuery(MOCK_ISSUED_INVOICES, search),
    [search],
  );

  const money = React.useMemo(
    () =>
      new Intl.NumberFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: "BRL",
      }),
    [locale],
  );

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("number", {
        header: t("columns.number"),
        sortingFn: (rowA, rowB, columnId) =>
          parseInvoiceNumber(String(rowA.getValue(columnId))) -
          parseInvoiceNumber(String(rowB.getValue(columnId))),
        cell: (info) => {
          const { muted, rest } = splitInvoiceNumberForDisplay(info.getValue());
          return (
            <span className="font-medium tabular-nums">
              {muted ? (
                <span className="text-muted-foreground">{muted}</span>
              ) : null}
              {rest}
            </span>
          );
        },
      }),
      columnHelper.accessor("issuedAt", {
        header: t("columns.issuedAt"),
        sortingFn: (rowA, rowB, columnId) =>
          new Date(String(rowA.getValue(columnId))).getTime() -
          new Date(String(rowB.getValue(columnId))).getTime(),
        cell: (info) => (
          <span className="text-muted-foreground tabular-nums">
            {format(parseISO(info.getValue()), datePattern, { locale: dateLocale })}
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.tomadorLegalName, {
        id: "tomador",
        header: t("columns.tomador"),
        cell: ({ row }) => {
          const cnpj = formatCnpj(row.original.tomadorCnpjDigits);
          return (
            <p className="max-w-md whitespace-normal leading-snug">
              <span className="font-medium">{row.original.tomadorLegalName}</span>{" "}
              <span className="text-muted-foreground tabular-nums">{cnpj}</span>
            </p>
          );
        },
      }),
      columnHelper.accessor((row) => `${row.serviceCode} ${row.serviceName}`, {
        id: "service",
        header: t("columns.service"),
        cell: ({ row }) => (
          <p className="max-w-md whitespace-normal leading-snug">
            <span className="tabular-nums text-muted-foreground">
              {row.original.serviceCode}
            </span>{" "}
            <span>{row.original.serviceName}</span>
          </p>
        ),
      }),
      columnHelper.accessor("serviceDescription", {
        header: t("columns.discrimination"),
        cell: (info) => (
          <p className="max-w-md whitespace-normal leading-snug">
            {info.getValue()}
          </p>
        ),
      }),
      columnHelper.accessor("totalCents", {
        header: t("columns.total"),
        cell: (info) => (
          <span className="tabular-nums">{money.format(info.getValue() / 100)}</span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        enableSorting: false,
        header: () => (
          <span className="block w-full pr-2 text-right">{t("columns.actions")}</span>
        ),
        cell: () => (
          <div className="flex justify-end gap-0.5 pr-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label={t("view")}
                  onClick={() => toast.message(t("actionSoon"))}
                >
                  <Eye className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{t("view")}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label={t("download")}
                  onClick={() => toast.message(t("actionSoon"))}
                >
                  <Download className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{t("download")}</TooltipContent>
            </Tooltip>
          </div>
        ),
      }),
    ],
    [t, money, dateLocale, datePattern],
  );

  const table = useReactTable({
    data: filtered,
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
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="h-11 px-6"
            onClick={() => toast.message(t("actionSoon"))}
          >
            {t("sendInvoice")}
          </Button>
          <Button size="lg" className="h-11 px-6" asChild>
            <Link href="/emit-invoice">{t("emitInvoice")}</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-md">
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="h-9"
        />
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
