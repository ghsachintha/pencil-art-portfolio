import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Skeleton className="h-20 w-3/4" />
            <Skeleton className="h-20 w-1/2" />
            <Skeleton className="h-6 w-full max-w-md" />
            <div className="flex gap-4">
              <Skeleton className="h-14 w-40" />
              <Skeleton className="h-14 w-40" />
            </div>
          </div>
          <div className="h-[50vh] md:h-[70vh] w-full flex items-center justify-center">
            <Skeleton className="w-3/4 aspect-[3/4] rounded-sm" />
          </div>
        </div>
      </section>

      {/* Projects Grid Skeleton */}
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-1 w-24 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-sm" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
