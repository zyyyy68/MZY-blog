import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { token, password } = body

  if (!token || !password) {
    return NextResponse.json({ error: "参数不完整" }, { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  })

  if (!user) {
    return NextResponse.json({ error: "链接已过期或无效" }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await hash(password, 12),
      resetToken: null,
      resetTokenExpiry: null,
    },
  })

  return NextResponse.json({ message: "密码已重置" })
}
