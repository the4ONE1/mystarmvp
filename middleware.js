import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Redirect mystarstories.org to mystarstories.com
  if (hostname.includes('mystarstories.org')) {
    url.hostname = 'mystarstories.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Redirect www.mystarstories.org to mystarstories.com
  if (hostname === 'www.mystarstories.org') {
    url.hostname = 'mystarstories.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Redirect www.mystarstories.com to mystarstories.com (optional - for consistency)
  if (hostname === 'www.mystarstories.com') {
    url.hostname = 'mystarstories.com';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

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
