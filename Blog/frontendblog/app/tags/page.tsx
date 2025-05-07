import Link from "next/link"
import { serverClient } from "@/lib/trpc/server-client"
import { Badge } from "@/components/ui/badge"

export default async function TagsPage() {
  const tags = await serverClient.tags.list.query()

  return (
    <main className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Tags</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/tags/${tag.name.toLowerCase()}`}>
            <Badge className="text-sm" variant="outline">
              {tag.name} ({tag.postCount})
            </Badge>
          </Link>
        ))}
      </div>
    </main>
  )
}
