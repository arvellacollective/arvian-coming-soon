import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const authCookie = req.cookies.get('arvian-muhur-auth')

  // 1. API yollarına ve Login sayfasına her zaman izin ver (Döngüyü önler)
  if (pathname.startsWith('/api') || pathname === '/production/login') {
    return NextResponse.next()
  }

  // 2. Sadece /production yollarını koru
  if (pathname.startsWith('/production')) {
    // Mühür (Cookie) varsa içeri al
    if (authCookie) {
      return NextResponse.next()
    }

    // Mühür yoksa popup açtırmadan direkt login sayfasına fırlat
    return NextResponse.redirect(new URL('/production/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/production/:path*'],
}