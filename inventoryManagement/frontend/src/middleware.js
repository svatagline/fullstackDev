import { NextResponse } from "next/server";

export function middleware(request) {
  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  // }

  const { pathname } = request.nextUrl;
  const isAuthorize = request.cookies.get("isLoggedIn")?.value === "true";

  // Define which paths should be protected
  // if (pathname.startsWith("/protected")) {
  // const token = request.cookies.get("auth_token");
  // If no token is found, redirect to login
  if (!isAuthorize) {
    return Response.redirect(new URL("/", request.url));
  }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
