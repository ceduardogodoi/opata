import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isAuthRoute,
  isProtectedRoute,
  isPublicRoute,
} from "./app/utils/routes";
import { JwtService } from "./app/infra/security/jwt-service";

export function middleware(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();

  const accessToken = request.cookies.get("access_token")?.value;
  if (accessToken == null && isProtectedRoute(url.pathname)) {
    url.pathname = "/admin/sign-in";

    return NextResponse.redirect(url);
  }

  if (!isPublicRoute(url.pathname) && !JwtService.isTokenValid(accessToken)) {
    url.pathname = "/admin/sign-in";

    const response = NextResponse.redirect(url);
    response.cookies.delete("access_token");
    return response;
  }

  if (JwtService.isTokenValid(accessToken) && isAuthRoute(url.pathname)) {
    url.pathname = "/admin/dashboard";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
