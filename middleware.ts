import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/account/login', request.url));
}

export const config = {
  matcher: ['/wishlist', '/account', '/account/dashboard'],
};
