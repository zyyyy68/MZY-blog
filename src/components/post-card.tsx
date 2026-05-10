import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  tags: string
  createdAt: string
  commentCount: number
}

export function PostCard({
  title,
  slug,
  excerpt,
  coverImage,
  tags,
  createdAt,
  commentCount,
}: PostCardProps) {
  const tagList = tags ? tags.split(",").filter(Boolean) : []
  const date = new Date(createdAt).toLocaleDateString("zh-CN")

  return (
    <Link href={`/posts/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        {coverImage && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </CardContent>
        <CardFooter className="px-4 pb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{date}</span>
          <div className="flex items-center gap-3">
            {tagList.length > 0 && (
              <span>{tagList[0]}{tagList.length > 1 ? ` +${tagList.length - 1}` : ""}</span>
            )}
            <span>{commentCount} 评论</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
