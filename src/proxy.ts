import { type NextRequest, NextResponse } from "next/server";

const TERMINAL_CLIENTS = /^(curl|wget|httpie|xh)\//i;
const TERMINAL_PAGES = /^\/(about|help|projects(\/[^/.]+)?|blog(\/[^/.]+)?)?$/;

// `curl jiayangchen.com` gets the portfolio as ANSI text instead of HTML.
// Coolify serves plain HTTP so bare curl works without -L; everyone else is
// redirected to HTTPS here.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent") ?? "";

  if (TERMINAL_CLIENTS.test(userAgent) && TERMINAL_PAGES.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/api/terminal${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  if (req.headers.get("x-forwarded-proto") === "http") {
    const url = new URL(req.nextUrl.pathname + req.nextUrl.search, req.url);
    url.protocol = "https:";
    url.host = req.headers.get("host") ?? url.host;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
