"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MarkdownEditor } from "@/components/markdown-editor"

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [published, setPublished] = useState(false)
  const [error, setError] = useState("")

  function generateSlug(title: string) {
    setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, content, tags, published, excerpt: excerpt || content.slice(0, 200) }),
    })

    if (res.ok) {
      router.push("/admin/posts")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || "创建失败")
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">写文章</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>标题</Label>
          <Input value={title} onChange={(e) => { setTitle(e.target.value); if (!slug) generateSlug(e.target.value) }} placeholder="文章标题" required />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-article-slug" required />
        </div>
        <div className="space-y-2">
          <Label>标签（逗号分隔）</Label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="技术,生活,随笔" />
        </div>
        <div className="space-y-2">
          <Label>简介</Label>
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="文章摘要，不填则自动截取正文前200字" rows={3} />
        </div>
        <div className="space-y-2">
          <Label>内容（Markdown）</Label>
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={published} onCheckedChange={setPublished} />
          <Label>立即发布</Label>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit">保存文章</Button>
      </form>
    </div>
  )
}
