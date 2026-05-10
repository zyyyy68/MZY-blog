import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PostList } from "./post-list"

export const dynamic = "force-dynamic"

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            写文章
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">还没有文章，写第一篇吧</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  )
}
