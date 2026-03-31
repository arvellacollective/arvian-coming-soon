import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProductionRoute = pathname.startsWith('/production')
  const isLoginRoute = pathname === '/production/login'

  // 1. API yollarına ve Login sayfasına dokunma (sonsuz döngüyü önler)
  if (pathname.startsWith('/api') || isLoginRoute) {
    return NextResponse.next()
  }

  if (isProductionRoute) {
    // 2. Mührü (Cookie) kontrol et
    const authCookie = req.cookies.get('arvian-muhur-auth')

    // Mühür varsa ve içeriği doğruysa geçişe izin ver
    if (authCookie && authCookie.value === 'açıldı') {
      return NextResponse.next()
    }

    // 3. Mühür yoksa, popup açmadan direkt kendi login sayfana yönlendir
    const loginUrl = new URL('/production/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Sadece production altındaki sayfaları izle
  matcher: ['/production/:path*'],
}