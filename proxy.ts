import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/billing/session";

/**
 * Gate for the private billing area. Anything under /admin except the sign-in
 * page needs a valid session cookie; pages redirect to sign-in, API routes
 * answer 401. Server actions and route handlers check again themselves.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  if (await verifySession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/api/")) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }
  const login = new URL("/admin/login", request.url);
  if (pathname !== "/admin") login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
