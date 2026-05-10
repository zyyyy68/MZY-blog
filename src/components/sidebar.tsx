interface SidebarProps {
  tags: string
  createdAt: string
}

export function Sidebar({ tags, createdAt }: SidebarProps) {
  const tagList = tags ? tags.split(",").filter(Boolean) : []
  const date = new Date(createdAt).toLocaleDateString("zh-CN")

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">发布时间</h3>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>

      {tagList.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">标签</h3>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="text-sm px-2 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
