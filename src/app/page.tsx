import { prisma } from "@/lib/prisma"
import { HomeTabs } from "@/components/home-tabs"

export const dynamic = "force-dynamic"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const activeTab = tab || "about"
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

  const serialized = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    tags: post.tags,
    createdAt: post.createdAt.toISOString(),
    commentCount: post._count.comments,
  }))

  return <HomeTabs posts={serialized} activeTab={activeTab} />
}
