import { prisma } from "@/lib/prisma"
import { CommentList } from "./comment-list"

export const dynamic = "force-dynamic"

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    include: {
      post: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">评论管理</h1>
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">暂无评论</p>
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  )
}
