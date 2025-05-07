import { notFound } from "next/navigation"
import { serverClient } from "@/lib/trpc/server-client"
import { AdminPostForm } from "@/components/admin/admin-post-form"

interface AdminPostPageProps {
  params: {
    id: string
  }
}

export default async function AdminPostPage({ params }: AdminPostPageProps) {
  // Handle "new" as a special case
  if (params.id === "new") {
    return (
      <div className="space-y-6 py-6">
        <h1 className="text-3xl font-bold">New Post</h1>
        <AdminPostForm />
      </div>
    )
  }

  try {
    const post = await serverClient.posts.byId.query({ id: params.id })

    if (!post) {
      notFound()
    }

    return (
      <div className="space-y-6 py-6">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <AdminPostForm post={post} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
