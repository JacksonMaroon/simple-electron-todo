import { AdminCommentsList } from "@/components/admin/admin-comments-list"

export default function AdminCommentsPage() {
  return (
    <div className="space-y-6 py-6">
      <h1 className="text-3xl font-bold">Comments</h1>
      <AdminCommentsList />
    </div>
  )
}
