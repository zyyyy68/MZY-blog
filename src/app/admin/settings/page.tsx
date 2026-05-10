"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")
    setError("")

    if (newPassword && newPassword !== confirmPassword) {
      setError("两次密码输入不一致")
      return
    }

    const body: Record<string, string> = {}
    if (name) body.name = name
    if (email) body.email = email
    if (newPassword) {
      body.newPassword = newPassword
      body.currentPassword = currentPassword
    }

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      setMessage("已更新")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || "更新失败")
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">账号设置</h1>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>用户名</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="留空则不修改" />
            </div>
            <div className="space-y-2">
              <Label>邮箱</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="留空则不修改" />
            </div>
            <hr />
            <p className="text-sm text-muted-foreground">修改密码请填写以下三项：</p>
            <div className="space-y-2">
              <Label>当前密码</Label>
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="修改密码时需要" />
            </div>
            <div className="space-y-2">
              <Label>新密码</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="留空则不修改" />
            </div>
            <div className="space-y-2">
              <Label>确认新密码</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="再次输入新密码" />
            </div>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit">保存修改</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
