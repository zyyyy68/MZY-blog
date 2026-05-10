import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get("tag")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  const where = {
    published: true,
    ...(tag ? { tags: { contains: tag } } : {}),
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
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
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({
    posts,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}
