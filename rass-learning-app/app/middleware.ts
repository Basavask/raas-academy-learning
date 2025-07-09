import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow all routes to be accessed
        // We'll handle protection in individual pages
        return true
      },
    },
  }
)

// Only protect specific routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
  ]
}