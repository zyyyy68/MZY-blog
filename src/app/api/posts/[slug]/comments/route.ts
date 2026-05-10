import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const comments = await prisma.comment.findMany({
    where: { postId: post.id, approved: true, parentId: null },
    include: {
      replies: {
        where: { approved: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(comments)
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const body = await request.json()
  const { author, email, content, parentId } = body

  if (!author || !content) {
    return NextResponse.json(
      { error: "Author and content are required" },
      { status: 400 }
    )
  }

  const hasLink = /https?:\/\//.test(content)

  const comment = await prisma.comment.create({
    data: {
      postId: post.id,
      author,
      email: email || null,
      content,
      parentId: parentId || null,
      approved: !hasLink,
    },
  })

  return NextResponse.json(
    {
      ...comment,
      message: hasLink
        ? "评论包含链接，审核通过后将显示"
        : "评论已提交，审核通过后将显示",
    },
    { status: 201 }
  )
}
