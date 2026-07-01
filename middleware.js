import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Optional: Redirect www.mystarstories.shop to mystarstories.shop
  // Remove the comment below if you want to enforce non-www
  /*
  if (hostname === 'www.mystarstories.shop') {
    url.hostname = 'mystarstories.shop';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  */

  return NextResponse.next();
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
};