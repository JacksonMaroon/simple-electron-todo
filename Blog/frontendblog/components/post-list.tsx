"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { trpc } from "@/lib/trpc/client"
import { PostItem } from "@/components/post-item"
import { PostListSkeleton } from "@/components/post-list-skeleton"

interface PostListProps {
  initialPosts?: any[]
  tag?: string
  series?: string
}

export function PostList({ initialPosts = [], tag, series }: PostListProps) {
  const [posts, setPosts] = useState<any[]>(initialPosts)
  const [page, setPage] = useState(1)
  const { ref, inView } = useInView()

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = trpc.posts.infiniteList.useInfiniteQuery(
    {
      limit: 10,
      tag,
      series,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: initialPosts.length
        ? {
            pages: [
              {
                items: initialPosts,
                nextCursor: 1,
              },
            ],
            pageParams: [0],
          }
        : undefined,
    },
  )

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {
    const allPosts = data?.pages.flatMap((page) => page.items) ?? []
    setPosts(allPosts)
  }, [data])

  if (isLoading && !posts.length) {
    return <PostListSkeleton />
  }

  if (!posts.length) {
    return <div className="text-center py-6">No posts found.</div>
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <div ref={ref} className="h-10">
        {isFetching && <PostListSkeleton count={1} />}
      </div>
    </div>
  )
}
