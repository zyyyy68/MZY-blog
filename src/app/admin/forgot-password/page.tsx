"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [resetLink, setResetLink] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setResetLink("")
    setLoading(true)

    const res = await fetch("/api/admin/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setResetLink(data.resetLink)
    } else {
      setError(data.error || "请求失败")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>忘记密码</CardTitle>
        </CardHeader>
        <CardContent>
          {resetLink ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600">重置链接已生成！</p>
              <div className="bg-muted p-3 rounded text-sm break-all">
                <a href={resetLink} className="text-blue-600 hover:underline">{resetLink}</a>
              </div>
              <p className="text-xs text-muted-foreground">链接有效期 1 小时，点击上方链接重置密码</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">输入管理员邮箱以获取密码重置链接</p>
              <Input type="email" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "处理中..." : "获取重置链接"}</Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            <Link href="/admin/login" className="text-muted-foreground hover:text-foreground">返回登录</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
