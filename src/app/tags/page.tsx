import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function TagsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { tags: true },
  })

  const tagCounts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags.split(",").map(t => t.trim()).filter(Boolean)) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }
  }

  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">标签</h1>
      {sorted.length === 0 ? (
        <p className="text-muted-foreground">暂无标签</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {sorted.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
            >
              {tag}
              <span className="text-muted-foreground text-xs">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
