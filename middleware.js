import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Only redirect www to non-www in production
  if (process.env.NODE_ENV === 'production' && hostname.startsWith('www.')) {
    // Remove www. prefix
    url.hostname = hostname.replace(/^www\./, '');
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
