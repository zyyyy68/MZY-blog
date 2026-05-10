"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Post {
  id: number
  title: string
  slug: string
  published: boolean
  tags: string
  createdAt: Date
  _count: { comments: number }
}

export function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter()

  async function handleDelete(id: number) {
    if (!confirm("确定删除这篇文章？")) return
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
          <TableHead>标签</TableHead>
          <TableHead>评论</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>日期</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{post.tags || "-"}</TableCell>
            <TableCell>{post._count.comments}</TableCell>
            <TableCell>
              <span className={`text-xs px-2 py-0.5 rounded ${
                post.published
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              }`}>
                {post.published ? "已发布" : "草稿"}
              </span>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("zh-CN")}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/admin/posts/edit/${post.id}`}>
                  <Button variant="outline" size="sm">编辑</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                  删除
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
