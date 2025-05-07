"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Home, MessageSquare, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      <Link
        href="/admin"
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
          pathname === "/admin" ? "bg-accent" : "transparent",
        )}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/admin/posts"
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
          pathname === "/admin/posts" || pathname.startsWith("/admin/posts/") ? "bg-accent" : "transparent",
        )}
      >
        <FileText className="h-4 w-4" />
        Posts
      </Link>
      <Link
        href="/admin/tags"
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
          pathname === "/admin/tags" ? "bg-accent" : "transparent",
        )}
      >
        <Tag className="h-4 w-4" />
        Tags
      </Link>
      <Link
        href="/admin/comments"
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
          pathname === "/admin/comments" ? "bg-accent" : "transparent",
        )}
      >
        <MessageSquare className="h-4 w-4" />
        Comments
      </Link>
    </nav>
  )
}
