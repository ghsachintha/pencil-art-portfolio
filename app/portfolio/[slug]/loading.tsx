export default function ProjectLoading() {
  return (
    <main className="min-h-screen">
      <div className="lg:flex min-h-screen">
        {/* Left: Image Placeholder */}
        <div className="lg:w-1/2 h-[50vh] lg:h-screen bg-neutral-200 dark:bg-neutral-800 animate-pulse relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-neutral-300 dark:text-neutral-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Content Placeholder */}
        <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center bg-white dark:bg-neutral-900">
          <div className="space-y-8 max-w-xl w-full animate-pulse">
            {/* Title & Meta */}
            <div className="space-y-4">
              <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-12 md:h-16 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              </div>
            </div>

            {/* Button */}
            <div className="pt-8">
              <div className="h-12 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
