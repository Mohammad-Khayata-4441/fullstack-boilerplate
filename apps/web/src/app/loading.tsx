import { Skeleton } from "@fullstack-boilerplate/ui/components/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-svh">
      <div className="px-2 py-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        <hr className="mt-1" />
      </div>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="grid gap-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
