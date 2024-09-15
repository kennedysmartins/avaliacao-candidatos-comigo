import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  const token =
    request.cookies.get("token")?.value

  const signInURL = new URL("/login", request.url)
  const dashboardURL = new URL("/", request.url)

  if (!token) {
    if (request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/forget") {
      return NextResponse.next()
    }
    return NextResponse.redirect(signInURL)
  } else {
    if (request.nextUrl.pathname == "/login") {
      return NextResponse.redirect(dashboardURL)
    }
  }
}

export const config = {
  matcher: ["/login","/forget", "/", "/atendimento-ao-cliente"],
}
