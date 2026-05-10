"use client"

import { PostCard } from "@/components/post-card"
import { Avatar } from "@/components/avatar"
import { Mail } from "lucide-react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  tags: string
  createdAt: string
  commentCount: number
}

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.49.49 0 0 1 .177-.553C22.028 18.074 24 16.22 24 13.999c0-3.614-3.523-6.478-7.062-5.14zM14.25 12.14c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function copyWechat() {
  navigator.clipboard.writeText("Mzyyyy68")
}

const contacts = [
  { icon: GithubIcon, href: "https://github.com/zyyyy68", label: "GitHub", external: true },
  { icon: WechatIcon, href: "#", label: "微信", onClick: copyWechat },
  { icon: Mail, href: "mailto:210701544@qq.com", label: "Email", external: true },
]

function monthLabel(key: string) {
  const [y, m] = key.split("-")
  return `${y} 年 ${parseInt(m)} 月`
}

function groupByMonth(posts: Post[]) {
  const groups: Record<string, Post[]> = {}
  for (const post of posts) {
    const key = `${new Date(post.createdAt).getFullYear()}-${String(new Date(post.createdAt).getMonth() + 1).padStart(2, "0")}`
    if (!groups[key]) groups[key] = []
    groups[key].push(post)
  }
  return groups
}

export function HomeTabs({ posts, activeTab }: { posts: Post[]; activeTab: string }) {
  const grouped = groupByMonth(posts)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {activeTab === "about" ? (
        <section className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)] justify-center">
          <Avatar />
          <h1 className="text-4xl font-bold mt-6">马振宇</h1>
          <p className="text-lg text-muted-foreground mt-2">珍贵的东西要往心里看</p>
          <div className="flex items-center gap-5 mt-6">
            {contacts.map((c) => {
              const Icon = c.icon
              if (c.onClick) {
                return (
                  <div key={c.label} className="relative group">
                    <button
                      onClick={c.onClick}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50">
                      <div className="bg-background rounded-lg shadow-lg ring-1 ring-border p-2">
                        <img src="/wechat-qr.jpg" alt="微信二维码" className="w-32 h-32 object-cover rounded" />
                        <p className="text-xs text-center text-muted-foreground mt-1 whitespace-nowrap">扫码加微信</p>
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={c.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        </section>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          还没有文章，敬请期待
        </p>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([month, monthPosts]) => (
            <section key={month}>
              <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
                {monthLabel(month)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    tags={post.tags}
                    createdAt={post.createdAt}
                    commentCount={post.commentCount}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
