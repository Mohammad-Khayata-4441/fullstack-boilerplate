import { Skeleton } from "@fullstack-boilerplate/ui/components/skeleton";

export default function LoginLoading() {
  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <div className="grid gap-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}
