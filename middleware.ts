import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/assets/") ||
    ["/sign-in"].some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  try {
    const session = await auth();

    if (!session?.user?.isAdmin) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"],
};

export default middleware;
