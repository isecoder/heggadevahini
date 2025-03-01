import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the request is accessing a protected admin route
  if (
    req.nextUrl.pathname.startsWith(
      "/about/protected/routes/heggade-vahini/admin-portal/admind"
    )
  ) {
    // Read refreshToken from cookies
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.redirect(
        new URL(
          "/about/protected/routes/heggade-vahini/admin-portal/login",
          req.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/about/protected/routes/heggade-vahini/admin-portal/admind/:path*",
};
