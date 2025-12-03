export default function OrderLoading() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Skeleton */}
        <div className="mb-12 text-center animate-pulse">
          <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-auto mb-4" />
          <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-auto" />
        </div>

        {/* Form Card Skeleton */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden h-[600px] animate-pulse relative">
          {/* Progress Bar Placeholder */}
          <div className="h-2 bg-neutral-100 dark:bg-neutral-800 w-full" />

          <div className="p-8 space-y-8">
            <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>

            <div className="h-32 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />

            <div className="flex justify-end pt-8">
              <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
