import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const [postCount, commentCount, pendingCount, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.comment.count(),
    prisma.comment.count({ where: { approved: false } }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, published: true, createdAt: true },
    }),
  ])

  return NextResponse.json({ postCount, commentCount, pendingCount, recentPosts })
}
