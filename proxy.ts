import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ARVIAN_AUTH_COOKIE_NAME,
  hasValidArvianCookie,
} from "@/app/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/production/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/production")) {
    const authCookieValue = request.cookies.get(ARVIAN_AUTH_COOKIE_NAME)?.value;

    if (hasValidArvianCookie(authCookieValue)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/production/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/production/:path*"],
};
