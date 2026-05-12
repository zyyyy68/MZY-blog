"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"

function TabLinks() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const activeTab = searchParams.get("tab") || "about"

  const links = [
    { href: "/?tab=posts", label: "文章", active: activeTab === "posts" },
    { href: "/tags", label: "标签", active: pathname.startsWith("/tags") },
    { href: "/about", label: "关于", active: pathname === "/about" },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm transition-colors ${link.active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MZY Blog
        </Link>
        <div className="flex items-center gap-4">
          <Suspense fallback={
            <>
              <Link href="/?tab=posts" className="text-sm text-muted-foreground">文章</Link>
              <Link href="/tags" className="text-sm text-muted-foreground">标签</Link>
              <Link href="/about" className="text-sm text-muted-foreground">关于</Link>
            </>
          }>
            <TabLinks />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}
