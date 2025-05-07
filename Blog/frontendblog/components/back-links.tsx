interface BackLink {
  id: string
  title: string
  slug: string
}

interface BackLinksProps {
  backlinks: BackLink[]
}

export function BackLinks({ backlinks }: BackLinksProps) {
  if (!backlinks.length) return null

  return (
    <div className="mt-10 rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Referenced by</h3>
      <ul className="space-y-1">
        {backlinks.map((link) => (
          <li key={link.id} className="text-sm">
            <a href={`/posts/${link.slug}`} className="hover:underline">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
