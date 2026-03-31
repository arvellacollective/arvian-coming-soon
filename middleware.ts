import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mühürlü Operasyon: Arvian Core /production Ünitesi Basic Auth Mührü
export function middleware(req: NextRequest) {
  const isProductionRoute = req.nextUrl.pathname.startsWith('/production')

  // API yollarına giden isteklerin middleware'e takılmasını önle (tarayıcı gerçi basic auth saklayınca gönderir ama temiz olsun)
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (isProductionRoute) {
    const basicAuth = req.headers.get('authorization')
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      try {
          const [user, pwd] = atob(authValue).split(':')
          if (user === '1' && pwd === '1') {
            return NextResponse.next()
          }
      } catch (e) {
         // Yanlış formatta header vs loglanabilir.
      }
    }
    
    // Başarısız veya ilk kez girildi. Authentication popup tetikle:
    return new NextResponse('Arvian Core Mühürlü', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Arvian Core Secure Area"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/production/:path*'],
}
