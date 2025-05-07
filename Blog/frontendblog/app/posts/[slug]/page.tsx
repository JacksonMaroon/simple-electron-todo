import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { serverClient } from "@/lib/trpc/server-client"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { PostContent } from "@/components/post-content"
import { BackLinks } from "@/components/back-links"
import { TableOfContents } from "@/components/table-of-contents"
import { PostComments } from "@/components/post-comments"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await serverClient.posts.bySlug.query({ slug: params.slug })

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.summary,
    authors: [
      {
        name: post.author?.name || "Anonymous",
      },
    ],
    openGraph: {
      title: post.title,
      description: post.summary || "",
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author?.name,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await serverClient.posts.bySlug.query({ slug: params.slug })

  if (!post) {
    notFound()
  }

  return (
    <main className="container py-10">
      <article className="prose mx-auto max-w-3xl dark:prose-invert">
        <h1 className="mb-2">{post.title}</h1>
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt?.toISOString() || ""}>
            {post.publishedAt ? formatDate(post.publishedAt) : "Unpublished"}
          </time>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {post.toc && <TableOfContents toc={post.toc} />}

        <PostContent content={post.content} />

        {post.backlinks && post.backlinks.length > 0 && <BackLinks backlinks={post.backlinks} />}
      </article>

      {post.commentsEnabled && (
        <div className="mx-auto mt-10 max-w-3xl">
          <PostComments postId={post.id} />
        </div>
      )}
    </main>
  )
}
