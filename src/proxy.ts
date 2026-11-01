import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next()
  }
  const locale = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (!locale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`
    return NextResponse.redirect(url)
  }
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", locale)
  requestHeaders.set("x-pathname", pathname)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.cookies.set("indoco-locale", locale, { path: "/", sameSite: "lax" })
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|studio).*)"],
}
