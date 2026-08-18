import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const adminaccestoken = request.cookies.get("AdminAccessToken");
  const adminrefreshtoken = request.cookies.get("AdminRefreshToken");
  const userAccessToken = request.cookies.get("userAccessToken");
  const userRefreshtoken = request.cookies.get("userRefreshtoken");

  if (pathname.startsWith("/admin")) {
    if (!adminaccestoken && !adminrefreshtoken) {
      return NextResponse.redirect(new URL("/adminLogin", request.url));
    }
  }

  if (pathname.startsWith("/checkout")) {
    if (!userAccessToken && !userRefreshtoken) {
      return NextResponse.redirect(new URL("/userLogin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/checkout/:path*"],
};
