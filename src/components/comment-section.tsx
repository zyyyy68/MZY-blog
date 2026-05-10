"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
  replies?: Comment[]
}

export function CommentSection({
  postSlug,
  initialComments,
}: {
  postSlug: string
  initialComments: Comment[]
}) {
  const [comments, setComments] = useState(initialComments)
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author || !content) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, email, content }),
      })
      const data = await res.json()
      setMessage(data.message)
      setAuthor("")
      setEmail("")
      setContent("")
    } catch {
      setMessage("提交失败，请重试")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">
        评论 ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-muted-foreground mb-6">暂无评论，来写第一条吧</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{comment.author}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 mt-3 space-y-3 border-l-2 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{reply.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(reply.createdAt).toLocaleDateString("zh-CN")}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
        <h4 className="font-semibold">发表评论</h4>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="昵称 *"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <Input
            placeholder="邮箱（选填）"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Textarea
          placeholder="写下你的评论..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "提交中..." : "发表评论"}
        </Button>
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </form>
    </div>
  )
}
