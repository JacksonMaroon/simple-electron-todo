import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface PostItemProps {
  post: any
}

export function PostItem({ post }: PostItemProps) {
  return (
    <article className="group space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
        <div className="flex flex-wrap gap-1">
          {post.tags?.map((tag: any) => (
            <Badge key={tag.id} variant="outline" className="text-xs">
              <Link href={`/tags/${tag.name.toLowerCase()}`}>{tag.name}</Link>
            </Badge>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold">
        <Link href={`/posts/${post.slug}`} className="group-hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.summary && <p className="text-muted-foreground">{post.summary}</p>}
    </article>
  )
}
