export default function AboutLoading() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Section Skeleton */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </div>

          {/* Content Section Skeleton */}
          <div className="space-y-8 order-1 lg:order-2 animate-pulse">
            <div>
              <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-sm mb-6" />
              <div className="w-20 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            </div>

            <div className="space-y-4">
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>

            {/* Philosophy Section Skeleton */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-sm border-l-4 border-neutral-200 dark:border-neutral-700">
              <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-sm mb-3" />
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm mb-2" />
              <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>

            <div className="pt-4">
              <div className="h-14 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
