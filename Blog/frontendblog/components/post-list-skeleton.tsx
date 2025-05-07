import { Skeleton } from "@/components/ui/skeleton"

interface PostListSkeletonProps {
  count?: number
}

export function PostListSkeleton({ count = 5 }: PostListSkeletonProps) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
      ))}
    </div>
  )
}
