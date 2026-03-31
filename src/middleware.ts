import { NextResponse, NextRequest } from "next/server"

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URLS
      ? JSON.parse(process.env.CLIENT_URLS)
      : []
    : []

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin")

  // Preflight requests need special handling
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin || "",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    })
  }
  const response = NextResponse.next()

  if (!allowedOrigins.length) {
    return response
  }

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("Origin not allowed", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": origin,
      },
    })
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Access-Control-Allow-Credentials", "true")
  }

  return response
}

export const config = {
  matcher: "/api/:path*",
}
