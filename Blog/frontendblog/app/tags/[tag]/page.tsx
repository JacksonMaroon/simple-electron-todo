import { Suspense } from "react"
import { notFound } from "next/navigation"
import { serverClient } from "@/lib/trpc/server-client"
import { PostList } from "@/components/post-list"
import { PostListSkeleton } from "@/components/post-list-skeleton"

interface TagPageProps {
  params: {
    tag: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)

  try {
    const tagData = await serverClient.tags.byName.query({ name: tag })

    if (!tagData) {
      notFound()
    }

    const initialPosts = await serverClient.posts.list.query({
      page: 1,
      limit: 10,
      tag,
    })

    return (
      <main className="container py-10">
        <h1 className="mb-8 text-3xl font-bold">Posts tagged with "{tagData.name}"</h1>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList initialPosts={initialPosts.posts} tag={tag} />
        </Suspense>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
