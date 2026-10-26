import { type NextRequest, NextResponse } from "next/server";

const TERMINAL_CLIENTS = /^(curl|wget|httpie|xh)\//i;

// `curl jiayangchen.com` gets the portfolio as ANSI text instead of HTML.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent") ?? "";
  if (!TERMINAL_CLIENTS.test(userAgent) || pathname.includes(".")) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/api/terminal${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/about", "/help", "/projects/:path*", "/blog/:path*"],
};
