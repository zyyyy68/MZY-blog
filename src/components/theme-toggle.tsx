"use client"

import { useState } from "react"
import { Sun, Moon } from "lucide-react"

function getInitialTheme(): string {
  if (typeof window === "undefined") return "light"
  const stored = localStorage.getItem("theme")
  if (stored === "dark" || stored === "light") return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState(getInitialTheme)
  const isDark = theme === "dark"

  const toggle = () => {
    const next = isDark ? "light" : "dark"
    setThemeState(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  return (
    <>
      <button
        onClick={toggle}
        className="inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted hover:text-foreground transition-colors text-muted-foreground"
        aria-label="切换主题"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </>
  )
}
