import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Sidebar } from "@/components/sidebar"
import { CommentSection } from "@/components/comment-section"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

export const dynamic = "force-dynamic"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  })

  if (!post) notFound()

  const comments = await prisma.comment.findMany({
    where: { postId: post.id, approved: true, parentId: null },
    include: {
      replies: {
        where: { approved: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  // Serialize dates for client component
  const serializedComments = JSON.parse(JSON.stringify(comments))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-lg mb-6"
            />
          )}
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="w-full md:w-64 shrink-0">
            <div className="md:sticky md:top-8">
              <Sidebar tags={post.tags} createdAt={post.createdAt.toISOString()} />
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <CommentSection
            postSlug={post.slug}
            initialComments={serializedComments}
          />
        </div>
      </article>
    </div>
  )
}
