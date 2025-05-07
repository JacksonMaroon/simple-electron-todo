import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/session"
import { AdminNav } from "@/components/admin/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex lg:w-[250px]">
        <AdminNav />
      </aside>
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  )
}
