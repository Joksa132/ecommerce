import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const userInfo = request.cookies.get('user-info')

  if (!userInfo) {
    if (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/cart") ||
      request.nextUrl.pathname.startsWith("/user/info")) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  } else {
    const parsedUserInfo = JSON.parse(userInfo.value)
    if (parsedUserInfo.role !== "ADMIN" && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.rewrite(new URL("/", request.url));
    } else if (request.nextUrl.pathname.startsWith("/user/login") || request.nextUrl.pathname.startsWith("/user/register")) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
}