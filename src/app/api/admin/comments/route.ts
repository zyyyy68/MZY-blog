import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const where = status === "pending"
    ? { approved: false }
    : status === "approved"
    ? { approved: true }
    : {}

  const comments = await prisma.comment.findMany({
    where,
    include: { post: { select: { title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(comments)
}
