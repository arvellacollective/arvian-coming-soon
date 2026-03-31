import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProductionRoute = pathname.startsWith('/production')
  const isLoginRoute = pathname === '/production/login'

  // 1. API yollarına ve kendi Login sayfana dokunma (sonsuz döngüyü önler)
  if (pathname.startsWith('/api') || isLoginRoute) {
    return NextResponse.next()
  }

  if (isProductionRoute) {
    // Mevcut header'ı kontrol et (tarayıcı bazen hafızasındaki şifreyi gönderir)
    const basicAuth = req.headers.get('authorization')
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      try {
          const [user, pwd] = atob(authValue).split(':')
          if (user === '1' && pwd === '1') {
            return NextResponse.next()
          }
      } catch (e) {
         // Hatalı format gelirse görmezden gel
      }
    }
    
    // 2. KRİTİK DEĞİŞİKLİK: Popup tetikleyen 401 status ve WWW-Authenticate header'ını sildik.
    // Kullanıcı yetkisizse popup açtırmak yerine doğrudan gömülü formun olduğu sayfaya yönlendiriyoruz.
    const loginUrl = new URL('/production/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Sadece production altındaki tüm yolları izle
  matcher: ['/production/:path*'],
}