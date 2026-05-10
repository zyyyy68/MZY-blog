import { prisma } from "@/lib/prisma"
import { PostCard } from "@/components/post-card"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">最新文章</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          还没有文章，敬请期待
        </p>
      ) : (
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
      )}
    </div>
  )
}
