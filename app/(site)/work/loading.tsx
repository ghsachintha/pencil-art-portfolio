export default function WorkLoading() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-10 md:h-12 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-sm mb-4" />
          <div className="h-6 w-full max-w-2xl bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        </div>

        <div className="space-y-8">
          {/* Filters Bar Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-800 p-6 rounded-sm shadow-sm border border-neutral-100 dark:border-neutral-700">
            <div className="h-10 w-full md:w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded-sm animate-pulse" />
            <div className="flex gap-4 w-full md:w-auto">
              <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-sm animate-pulse" />
              <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-sm animate-pulse" />
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
