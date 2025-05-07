import { Suspense } from "react"
import { notFound } from "next/navigation"
import { serverClient } from "@/lib/trpc/server-client"
import { PostList } from "@/components/post-list"
import { PostListSkeleton } from "@/components/post-list-skeleton"

interface SeriesPageProps {
  params: {
    slug: string
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  try {
    const series = await serverClient.series.bySlug.query({ slug: params.slug })

    if (!series) {
      notFound()
    }

    const initialPosts = await serverClient.posts.list.query({
      page: 1,
      limit: 10,
      series: series.id,
    })

    return (
      <main className="container py-10">
        <h1 className="mb-2 text-3xl font-bold">{series.title}</h1>
        {series.description && <p className="mb-8 text-muted-foreground">{series.description}</p>}
        <Suspense fallback={<PostListSkeleton />}>
          <PostList initialPosts={initialPosts.posts} series={series.id} />
        </Suspense>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
