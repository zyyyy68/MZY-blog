"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

function NavbarInner() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "about"

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MZY Blog
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm transition-colors ${activeTab === "about" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            关于
          </Link>
          <Link
            href="/?tab=posts"
            className={`text-sm transition-colors ${activeTab === "posts" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            文章
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  )
}
