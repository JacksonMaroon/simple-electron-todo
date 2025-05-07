import { serverClient } from "@/lib/trpc/server-client"
import { Badge } from "@/components/ui/badge"

interface LinksByYear {
  [year: string]: {
    title: string
    url: string
    description?: string
    tags: string[]
  }[]
}

export default async function LinksPage() {
  const links = await serverClient.links.list.query()

  // Group links by year
  const linksByYear: LinksByYear = {}

  links.forEach((link) => {
    const year = new Date(link.createdAt).getFullYear().toString()
    if (!linksByYear[year]) {
      linksByYear[year] = []
    }
    linksByYear[year].push({
      title: link.title,
      url: link.url,
      description: link.description,
      tags: link.tags || [],
    })
  })

  // Sort years in descending order
  const sortedYears = Object.keys(linksByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <main className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Links</h1>

      <div className="space-y-10">
        {sortedYears.map((year) => (
          <section key={year}>
            <h2 className="mb-4 text-2xl font-bold">{year}</h2>
            <ul className="space-y-4">
              {linksByYear[year].map((link, index) => (
                <li key={index} className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link.title}
                    </a>
                  </h3>
                  {link.description && <p className="mt-1 text-muted-foreground">{link.description}</p>}
                  {link.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {link.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
