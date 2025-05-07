"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { trpc } from "@/lib/trpc/client"
import { useDebounce } from "@/lib/hooks/use-debounce"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebounce(search, 300)

  const { data: posts, isLoading } = trpc.posts.search.useQuery(
    { query: debouncedSearch, limit: 5 },
    { enabled: debouncedSearch.length > 0 },
  )

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (slug: string) => {
    setOpen(false)
    router.push(`/posts/${slug}`)
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search posts..." value={search} onValueChange={setSearch} />
        <CommandList>
          {debouncedSearch.length > 0 && (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Posts">
                {isLoading ? (
                  <CommandItem disabled>Loading...</CommandItem>
                ) : (
                  posts?.map((post) => (
                    <CommandItem key={post.id} onSelect={() => handleSelect(post.slug)}>
                      {post.title}
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

// Export the icon separately for reuse
CommandMenu.Icon = function CommandMenuIcon() {
  return <Search className="h-4 w-4" />
}
