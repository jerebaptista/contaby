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
import { Eye, Pencil } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  filterClientsBySearch,
  MOCK_CLIENTS,
  revenueCentsByTomadorCnpj,
  type MockClient,
} from "@/lib/mocks/clients";
import { cn } from "@/lib/utils";
import { DataTableSortHeader } from "@/components/dashboard/financial/data-table-sort-header";

type ClientRow = MockClient & { revenueCents: number };

const columnHelper = createColumnHelper<ClientRow>();

function tradeNameInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function ClientsListPage() {
  const t = useTranslations("Dashboard.clients");
  const locale = useLocale();

  const revenueByCnpj = React.useMemo(() => revenueCentsByTomadorCnpj(), []);

  const rowsWithRevenue = React.useMemo<ClientRow[]>(
    () =>
      MOCK_CLIENTS.map((c) => ({
        ...c,
        revenueCents: revenueByCnpj.get(c.cnpjDigits) ?? 0,
      })),
    [revenueByCnpj],
  );

  const [search, setSearch] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "tradeName", desc: false },
  ]);

  const filtered = React.useMemo(
    () => filterClientsBySearch(rowsWithRevenue, search),
    [rowsWithRevenue, search],
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
      columnHelper.display({
        id: "avatar",
        enableSorting: false,
        header: () => null,
        cell: ({ row }) => (
          <Avatar className="size-9 shrink-0 overflow-hidden rounded-md after:hidden">
            {row.original.logoUrl ? (
              <AvatarImage
                src={row.original.logoUrl}
                alt=""
                className="rounded-md object-cover"
              />
            ) : null}
            <AvatarFallback className="rounded-md text-[11px] font-medium">
              {tradeNameInitials(row.original.tradeName)}
            </AvatarFallback>
          </Avatar>
        ),
      }),
      columnHelper.accessor("tradeName", {
        header: t("columns.tradeName"),
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("legalName", {
        header: t("columns.legalName"),
        cell: (info) => (
          <p className="max-w-xs whitespace-normal leading-snug">
            {info.getValue()}
          </p>
        ),
      }),
      columnHelper.accessor("cnpjDigits", {
        header: t("columns.cnpj"),
        sortingFn: (rowA, rowB, columnId) =>
          String(rowA.getValue(columnId)).localeCompare(
            String(rowB.getValue(columnId)),
          ),
        cell: (info) => (
          <span className="text-muted-foreground tabular-nums">
            {formatCnpj(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("address", {
        header: t("columns.address"),
        cell: (info) => (
          <p className="max-w-md whitespace-normal leading-snug text-muted-foreground">
            {info.getValue()}
          </p>
        ),
      }),
      columnHelper.accessor("phone", {
        header: t("columns.phone"),
        cell: (info) => (
          <span className="text-muted-foreground tabular-nums whitespace-nowrap">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("email", {
        header: t("columns.email"),
        cell: (info) => (
          <span className="max-w-xs truncate text-muted-foreground">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("revenueCents", {
        header: t("columns.revenue"),
        cell: (info) => (
          <span className="tabular-nums font-medium">
            {money.format(info.getValue() / 100)}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        enableSorting: false,
        header: () => (
          <span className="block w-full pr-2 text-right">
            {t("columns.actions")}
          </span>
        ),
        cell: ({ row }) => {
          const q = encodeURIComponent(row.original.legalName);
          return (
            <div className="flex justify-end gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={t("viewInvoices")}
                    asChild
                  >
                    <Link href={`/financial/revenue?q=${q}`}>
                      <Eye className="size-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">{t("viewInvoices")}</TooltipContent>
              </Tooltip>
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
          );
        },
      }),
    ],
    [t, money],
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
        <div className="flex w-full shrink-0 justify-end lg:w-auto">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="h-11 px-6"
            onClick={() => toast.message(t("actionSoon"))}
          >
            {t("add")}
          </Button>
        </div>
      </div>

      <div className="flex max-w-md flex-col gap-1.5">
        <Label htmlFor="clients-search">{t("filters.search")}</Label>
        <Input
          id="clients-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("filters.searchPlaceholder")}
          aria-label={t("filters.searchPlaceholder")}
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
                      header.column.id === "avatar" && "w-12 px-2",
                    )}
                  >
                    {header.isPlaceholder ? null : header.column.id ===
                      "avatar" ? null : (
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
                        cell.column.id === "avatar" && "w-12 px-2",
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
