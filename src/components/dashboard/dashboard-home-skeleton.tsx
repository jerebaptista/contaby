import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ListRowSkeleton({ withAmount = true }: { withAmount?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <Skeleton className="mt-0.5 size-4 shrink-0 rounded-sm" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-4 w-[min(100%,14rem)]" />
        <Skeleton className="h-3 w-24" />
      </div>
      {withAmount ? (
        <Skeleton className="h-4 w-16 shrink-0 rounded-sm" />
      ) : (
        <Skeleton className="size-8 shrink-0 rounded-md" />
      )}
    </li>
  );
}

/** Espelha o layout da home (cards + gráficos) para loading e Suspense. */
export function DashboardHomeSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-8 w-[min(100%,18rem)] rounded-md" />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-0 pt-4">
              <Skeleton className="h-5 w-[min(100%,12rem)]" />
              <Skeleton className="size-8 shrink-0 rounded-md" />
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-4 pb-4 pt-4">
              <Skeleton className="h-9 w-36" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-1 h-[88px] w-full rounded-md pb-1" />
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="flex flex-row items-start justify-between gap-3 pb-0 pt-4">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-10" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-3">
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="flex justify-between gap-4">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-24" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
            <div className="min-w-0 space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-44" />
            </div>
            <Skeleton className="size-8 shrink-0 rounded-md" />
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3">
            <ul className="space-y-3">
              <ListRowSkeleton />
              <ListRowSkeleton />
              <ListRowSkeleton />
            </ul>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
            <div className="min-w-0 space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="size-8 shrink-0 rounded-md" />
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3">
            <ul className="space-y-3">
              <ListRowSkeleton withAmount={false} />
              <ListRowSkeleton withAmount={false} />
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="gap-1 pb-0 pt-4">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-4">
          <Skeleton className="h-[220px] w-full rounded-md" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {["a", "b", "c"].map((k) => (
          <Card key={k}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-full max-w-[12rem]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="min-h-[120px] w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
