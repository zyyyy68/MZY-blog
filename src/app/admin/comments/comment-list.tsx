"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: number
  author: string
  content: string
  approved: boolean
  createdAt: Date
  post: { title: string; slug: string }
}

export function CommentList({ comments }: { comments: Comment[] }) {
  const router = useRouter()

  async function handleApprove(id: number) {
    await fetch(`/api/admin/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    })
    router.refresh()
  }

  async function handleDelete(id: number) {
    if (!confirm("确定删除这条评论？")) return
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>评论者</TableHead>
          <TableHead>内容</TableHead>
          <TableHead>文章</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>日期</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments.map((comment) => (
          <TableRow key={comment.id}>
            <TableCell className="font-medium">{comment.author}</TableCell>
            <TableCell className="max-w-xs truncate text-sm">{comment.content}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{comment.post.title}</TableCell>
            <TableCell>
              {comment.approved ? (
                <Badge variant="outline" className="text-green-600">已通过</Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-600">待审核</Badge>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString("zh-CN")}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {!comment.approved && (
                  <Button variant="outline" size="sm" onClick={() => handleApprove(comment.id)}>
                    通过
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(comment.id)}>
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
