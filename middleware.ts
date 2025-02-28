// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("adminToken")?.value;

//   if (!token && req.nextUrl.pathname.startsWith("/about/protected/routes/heggade-vahini/admin-portal/dashboard")) {
//     return NextResponse.redirect(new URL("/about/protected/routes/heggade-vahini/admin-portal/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/about/protected/routes/heggade-vahini/admin-portal/dashboard/:path*",
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = true;

  if (
    request.nextUrl.pathname.startsWith(
      "/about/protected/routes/heggade-vahini/admin-portal"
    ) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(
      new URL(
        "/about/protected/routes/heggade-vahini/admin-portal/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/about/protected/routes/heggade-vahini/admin-portal/:path*",
};
