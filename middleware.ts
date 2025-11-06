import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /admin, /tiers)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ['/', '/auth', '/tiers']
  const isPublicPath = publicPaths.some(publicPath =>
    path === publicPath || path.startsWith(`${publicPath}/`)
  )

  // If accessing admin routes, we'll let the component handle authentication
  // since Firebase auth state needs to be checked on the client side
  if (path.startsWith('/admin')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
