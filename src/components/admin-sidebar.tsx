"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, MessageSquare, LogOut } from "lucide-react"

const navItems = [
  { href: "/admin", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/comments", label: "评论管理", icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r min-h-screen p-4 space-y-2">
      <Link href="/admin" className="text-lg font-bold block mb-6 px-3">
        后台管理
      </Link>

      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
              isActive
                ? "bg-secondary font-medium"
                : "hover:bg-secondary/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}

      <div className="pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </Button>
      </div>
    </aside>
  )
}
