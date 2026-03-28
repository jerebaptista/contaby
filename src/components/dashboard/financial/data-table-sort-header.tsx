"use client";

import * as React from "react";
import type { Header } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DataTableSortHeaderProps<TData> = {
  header: Header<TData, unknown>;
  children: React.ReactNode;
  className?: string;
};

export function DataTableSortHeader<TData>({
  header,
  children,
  className,
}: DataTableSortHeaderProps<TData>) {
  if (!header.column.getCanSort()) {
    return <span className={className}>{children}</span>;
  }
  const sorted = header.column.getIsSorted();
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      onClick={header.column.getToggleSortingHandler()}
    >
      {children}
      <span
        className="inline-flex opacity-0 transition-opacity duration-150 group-hover/sort-head:opacity-100 group-focus-within/sort-head:opacity-100"
        aria-hidden
      >
        {sorted === "asc" ? (
          <ArrowUp className="size-3.5 shrink-0 opacity-70" />
        ) : sorted === "desc" ? (
          <ArrowDown className="size-3.5 shrink-0 opacity-70" />
        ) : (
          <ArrowUpDown className="size-3.5 shrink-0 opacity-50" />
        )}
      </span>
    </button>
  );
}
