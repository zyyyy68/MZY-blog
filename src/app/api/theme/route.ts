import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("mode")
  const referer = request.headers.get("referer") || "/"
  const redirectUrl = new URL(referer)

  if (mode !== "dark" && mode !== "light") {
    return NextResponse.redirect(referer)
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>切换主题</title>
  <script>
    localStorage.setItem("theme", ${JSON.stringify(mode)})
    document.documentElement.classList.toggle("dark", ${mode === "dark"})
    location.href = ${JSON.stringify(redirectUrl.origin + redirectUrl.pathname)}
  </script>
</head>
<body></body>
</html>`

  return new NextResponse(html, {
    headers: { "content-type": "text/html;charset=utf-8" },
  })
}
