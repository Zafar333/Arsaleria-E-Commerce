import { NextResponse } from "next/server";

export function proxy(request) {
    const adminaccestoken= request.cookies.get("AdminAccessToken")
  const adminrefreshtoken= request.cookies.get("AdminRefreshToken")

  if (!adminaccestoken && !adminrefreshtoken) {
    return NextResponse.redirect(new URL("/adminLogin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};