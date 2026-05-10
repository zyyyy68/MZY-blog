"use client"

import { useState } from "react"

export function Avatar() {
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  return (
    <div className="w-36 h-36 rounded-full overflow-hidden bg-muted ring-2 ring-border">
      <img
        src="/avatar.jpg"
        alt="avatar"
        className="w-full h-full object-cover"
        onError={() => setHidden(true)}
      />
    </div>
  )
}
