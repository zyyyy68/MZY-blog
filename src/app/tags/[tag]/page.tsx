import { prisma } from "@/lib/prisma"
import { PostCard } from "@/components/post-card"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      tags: { contains: decodedTag },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      createdAt: true,
      _count: { select: { comments: { where: { approved: true } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">标签: {decodedTag}</h1>
      <p className="text-muted-foreground mb-8">
        共 {posts.length} 篇文章
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
            tags={post.tags}
            createdAt={post.createdAt.toISOString()}
            commentCount={post._count.comments}
          />
        ))}
      </div>
    </div>
  )
}
