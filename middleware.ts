import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Expose the request pathname to server components via a request header.
 * The root layout reads it to set <html lang> per route (the site is English,
 * but /work/buzomed renders Romanian content, so it needs lang="ro").
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Run on real pages only; skip Next internals and static assets.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
