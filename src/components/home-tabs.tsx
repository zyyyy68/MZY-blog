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

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const contacts = [
  { icon: GithubIcon, href: "https://github.com/zyyyy68", label: "GitHub" },
  { icon: Mail, href: "mailto:admin@blog.com", label: "Email" },
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
        <section className="flex flex-col items-center text-center">
          <Avatar />
          <h1 className="text-2xl font-bold mt-4">马振宇</h1>
          <p className="text-muted-foreground mt-1">前运维 · 全栈学习中</p>
          <div className="flex items-center gap-4 mt-4">
            {contacts.map((c) => {
              const Icon = c.icon
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
