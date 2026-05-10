import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditPostForm } from "./edit-post-form"

export const dynamic = "force-dynamic"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: idStr } = await params
  const id = parseInt(idStr)
  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) notFound()

  return <EditPostForm post={post} />
}
