import { PostListSkeleton } from "@/components/post-list-skeleton"

export default function Loading() {
  return (
    <main className="container py-10">
      <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
      <div className="mt-8">
        <PostListSkeleton />
      </div>
    </main>
  )
}
