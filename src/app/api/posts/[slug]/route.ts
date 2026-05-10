import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
    include: { _count: { select: { comments: true } } },
  })

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(post)
}
