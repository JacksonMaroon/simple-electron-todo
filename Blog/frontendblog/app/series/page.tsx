import Link from "next/link"
import { serverClient } from "@/lib/trpc/server-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function SeriesPage() {
  const series = await serverClient.series.list.query()

  return (
    <main className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Series</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {series.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/series/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </CardTitle>
              <CardDescription>{item.postCount} posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
