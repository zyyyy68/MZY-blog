import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } },
  })
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, slug, content, excerpt, coverImage, published, tags } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 })
  }

  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 })
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || content.slice(0, 200),
      coverImage: coverImage || null,
      published: published ?? false,
      tags: tags || "",
    },
  })

  return NextResponse.json(post, { status: 201 })
}
