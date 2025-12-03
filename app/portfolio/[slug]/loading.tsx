import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column (Span 2) - Gallery Skeleton */}
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="w-full aspect-[4/3] rounded-sm" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-sm" />
              ))}
            </div>
          </div>

          {/* Right Column (Span 1) - Sidebar Skeleton */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-8" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <Skeleton className="h-12 w-full rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
