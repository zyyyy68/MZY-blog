import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow login and password reset pages and APIs
  if (
    path === "/admin/login" ||
    path === "/admin/forgot-password" ||
    path === "/admin/reset-password" ||
    path === "/api/admin/forgot-password" ||
    path === "/api/admin/reset-password"
  ) {
    return NextResponse.next()
  }

  // Protect admin routes and admin API
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    const token = await getToken({ req: request })
    if (!token) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
