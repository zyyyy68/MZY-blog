import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { hash, compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request })
  if (!token?.id) {
    return NextResponse.json({ error: "未登录" }, { status: 401 })
  }

  const body = await request.json()
  const { name, email, currentPassword, newPassword } = body

  const user = await prisma.user.findUnique({ where: { id: parseInt(token.id) } })
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 })
  }

  if (email && email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "该邮箱已被使用" }, { status: 409 })
    }
  }

  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json({ error: "需要当前密码" }, { status: 400 })
    }
    const isValid = await compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "当前密码错误" }, { status: 403 })
    }
  }

  const data: Record<string, string> = {}
  if (name !== undefined) data.name = name
  if (email !== undefined) data.email = email
  if (newPassword) data.password = await hash(newPassword, 12)

  await prisma.user.update({
    where: { id: user.id },
    data,
  })

  return NextResponse.json({ message: "已更新" })
}
