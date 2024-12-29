import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  type: 'home' | 'database';
}

export function SkeletonLoader({ type }: SkeletonLoaderProps) {
  if (type === 'home') {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-8" style={{ minHeight: '600px' }}>
          <div className="space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="h-full">
            <Skeleton className="h-full w-full min-h-[400px]" />
          </div>
        </div>
      </div>
    );
  }

  // Database skeleton remains unchanged
  return (
    <div className="p-4 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}