import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (token) {
    if (request.nextUrl.pathname === '/account')
      return NextResponse.redirect(new URL('/account/dashboard', request.url));
    else return;
  } else return NextResponse.redirect(new URL('/account/login', request.url));
}

export const config = {
  matcher: ['/wishlist', '/cart', '/account', '/account/dashboard'],
};
