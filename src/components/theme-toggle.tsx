"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <a
      href={`/api/theme?mode=${isDark ? "light" : "dark"}`}
      onClick={(e) => {
        e.preventDefault()
        setTheme(isDark ? "light" : "dark")
      }}
      className="inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted hover:text-foreground transition-colors text-muted-foreground"
      aria-label="切换主题"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </a>
  )
}
