import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email } = body

  if (!email) {
    return NextResponse.json({ error: "请输入邮箱" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: "该邮箱未注册" }, { status: 404 })
  }

  const resetToken = randomBytes(32).toString("hex")
  const resetTokenExpiry = new Date(Date.now() + 3600000)

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken, resetTokenExpiry },
  })

  return NextResponse.json({
    message: "重置链接已生成",
    resetLink: `${request.headers.get("origin") || ""}/admin/reset-password?token=${resetToken}`,
  })
}
