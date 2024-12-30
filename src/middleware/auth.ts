import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/api/auth/login' ||
    request.nextUrl.pathname === '/api/auth/logout'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth');

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Authentication required' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid authentication token' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const config = {
  matcher: [
    '/api/user/:path*',
    '/api/workouts/:path*',
    '/api/leaderboard/:path*',
  ],
};