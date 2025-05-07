import { Suspense } from "react"
import { serverClient } from "@/lib/trpc/server-client"
import { PostList } from "@/components/post-list"
import { PostListSkeleton } from "@/components/post-list-skeleton"

export default async function HomePage() {
  const initialPosts = await serverClient.posts.list.query({
    page: 1,
    limit: 10,
  })

  return (
    <main className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Latest Posts</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList initialPosts={initialPosts.posts} />
      </Suspense>
    </main>
  )
}
