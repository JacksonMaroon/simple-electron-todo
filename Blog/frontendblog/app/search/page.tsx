"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import { PostItem } from "@/components/post-item"
import { PostListSkeleton } from "@/components/post-list-skeleton"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(searchQuery, 300)

  const { data: posts, isLoading } = trpc.posts.search.useQuery(
    { query: debouncedQuery, limit: 20 },
    { enabled: debouncedQuery.length > 0 },
  )

  useEffect(() => {
    // Update URL with search query
    const url = new URL(window.location.href)
    if (debouncedQuery) {
      url.searchParams.set("q", debouncedQuery)
    } else {
      url.searchParams.delete("q")
    }
    window.history.replaceState({}, "", url.toString())
  }, [debouncedQuery])

  return (
    <main className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Search</h1>
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {debouncedQuery ? (
        <>
          {isLoading ? (
            <PostListSkeleton />
          ) : posts?.length === 0 ? (
            <p>No results found for "{debouncedQuery}"</p>
          ) : (
            <>
              <p className="mb-4">
                {posts?.length} results for "{debouncedQuery}"
              </p>
              <div className="space-y-8">
                {posts?.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p>Enter a search term to find posts</p>
      )}
    </main>
  )
}
