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
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  MOCK_BANK_ACCOUNTS,
  MOCK_PAYMENT_CARDS,
  formatCardExpiryMmYy,
  type MockBankAccount,
  type MockPaymentCard,
} from "@/lib/mocks/accounts";
import { cn } from "@/lib/utils";
import { DataTableSortHeader } from "@/components/dashboard/financial/data-table-sort-header";

const bankColumnHelper = createColumnHelper<MockBankAccount>();
const cardColumnHelper = createColumnHelper<MockPaymentCard>();

export function AccountsListPage() {
  const t = useTranslations("Dashboard.accounts");
  const tBankCols = useTranslations("Dashboard.accounts.bankColumns");
  const tCardCols = useTranslations("Dashboard.accounts.cardColumns");

  const [bankSorting, setBankSorting] = React.useState<SortingState>([
    { id: "bankName", desc: false },
  ]);
  const [cardSorting, setCardSorting] = React.useState<SortingState>([
    { id: "brand", desc: false },
  ]);

  const bankColumns = React.useMemo(
    () => [
      bankColumnHelper.accessor("bankName", {
        header: tBankCols("bankName"),
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      }),
      bankColumnHelper.accessor("bankCode", {
        header: tBankCols("code"),
        cell: (info) => (
          <span className="tabular-nums text-muted-foreground">
            {info.getValue()}
          </span>
        ),
      }),
      bankColumnHelper.accessor("agency", {
        header: tBankCols("agency"),
        cell: (info) => (
          <span className="tabular-nums">{info.getValue()}</span>
        ),
      }),
      bankColumnHelper.accessor("accountNumber", {
        header: tBankCols("account"),
        cell: (info) => (
          <span className="tabular-nums">{info.getValue()}</span>
        ),
      }),
      bankColumnHelper.accessor("pixKey", {
        header: tBankCols("pixKey"),
        cell: (info) => {
          const v = info.getValue();
          return (
            <span className="max-w-[14rem] truncate" title={v}>
              {v}
            </span>
          );
        },
      }),
      bankColumnHelper.display({
        id: "actions",
        enableSorting: false,
        header: () => (
          <span className="block w-full pr-2 text-right">
            {t("columns.actions")}
          </span>
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
    [t, tBankCols],
  );

  const cardColumns = React.useMemo(
    () => [
      cardColumnHelper.accessor("brand", {
        header: tCardCols("brand"),
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      cardColumnHelper.accessor("lastFour", {
        id: "number",
        header: tCardCols("number"),
        cell: (info) => (
          <span className="tabular-nums">
            {t("finalDigits", { digits: info.getValue() })}
          </span>
        ),
      }),
      cardColumnHelper.accessor(
        (row) => row.expiryYear * 100 + row.expiryMonth,
        {
          id: "expiry",
          header: tCardCols("expiry"),
          cell: ({ row }) => (
            <span className="text-muted-foreground tabular-nums">
              {formatCardExpiryMmYy(
                row.original.expiryMonth,
                row.original.expiryYear,
              )}
            </span>
          ),
        },
      ),
      cardColumnHelper.display({
        id: "actions",
        enableSorting: false,
        header: () => (
          <span className="block w-full pr-2 text-right">
            {t("columns.actions")}
          </span>
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
    [t, tCardCols],
  );

  const bankTable = useReactTable({
    data: MOCK_BANK_ACCOUNTS,
    columns: bankColumns,
    state: { sorting: bankSorting },
    onSortingChange: setBankSorting,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const cardTable = useReactTable({
    data: MOCK_PAYMENT_CARDS,
    columns: cardColumns,
    state: { sorting: cardSorting },
    onSortingChange: setCardSorting,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-10">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {t("banksTitle")}
          </h2>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="h-11 w-full shrink-0 px-6 sm:w-auto"
            onClick={() => toast.message(t("actionSoon"))}
          >
            {t("add")}
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              {bankTable.getHeaderGroups().map((hg) => (
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
              {bankTable.getRowModel().rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {t("cardsTitle")}
          </h2>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="h-11 w-full shrink-0 px-6 sm:w-auto"
            onClick={() => toast.message(t("actionSoon"))}
          >
            {t("add")}
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              {cardTable.getHeaderGroups().map((hg) => (
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
              {cardTable.getRowModel().rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
