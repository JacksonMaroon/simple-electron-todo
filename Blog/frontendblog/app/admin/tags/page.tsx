import { AdminTagsList } from "@/components/admin/admin-tags-list"

export default function AdminTagsPage() {
  return (
    <div className="space-y-6 py-6">
      <h1 className="text-3xl font-bold">Tags</h1>
      <AdminTagsList />
    </div>
  )
}
