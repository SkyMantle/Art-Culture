import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['uk', 'en']
const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    const res = NextResponse.next()
    res.headers.set('X-Art-Culture', 'true')
    return res
  }

  const locale = pathname.split('/')[1]

  if (!locales.includes(locale)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? `/${locales[0]}` : `/${locales[0]}${pathname}`
    return NextResponse.redirect(url)
  }

  const res = NextResponse.next()
  res.headers.set('X-Art-Culture', 'true')
  res.headers.set('x-locale', locale)
  return res
}

export const config = {
  matcher: '/:path*',
}
