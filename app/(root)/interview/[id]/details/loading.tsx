import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-6">
        <Skeleton className="mb-4 h-8 w-32" /> {/* Back button */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:w-3/4">
            <Skeleton className="mb-3 h-10 w-3/4" /> {/* Title */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-32" /> {/* Company */}
              <Skeleton className="h-5 w-40" /> {/* Date */}
              <Skeleton className="h-5 w-24" /> {/* Duration */}
              <Skeleton className="h-5 w-36" /> {/* Badge */}
            </div>
          </div>
          <Skeleton className="h-20 w-40" /> {/* Score card */}
        </div>
      </div>
      {/* Performance categories skeleton */}
      <div className="mb-8">
        <Skeleton className="mb-4 h-8 w-56" /> {/* Section title */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
      {/* Feedback summary skeleton */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <Skeleton className="h-64 w-full" /> {/* Strengths card */}
        <Skeleton className="h-64 w-full" /> {/* Improvements card */}
      </div>
      {/* Overall feedback skeleton */}
      <Skeleton className="mb-8 h-40 w-full" /> {/* Feedback card */}
      {/* Q&A skeleton */}
      <Skeleton className="mb-4 h-8 w-56" /> {/* Section title */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
      {/* Action buttons skeleton */}
      <div className="mt-8 flex justify-between">
        <Skeleton className="h-10 w-40" /> {/* Back button */}
        <Skeleton className="h-10 w-40" /> {/* Practice again button */}
      </div>
    </div>
  );
}
