import type { NextRequest } from "next/server";
import { stripAnsi } from "@/lib/terminal/ansi";
import { renderTerminalPage, toText } from "@/lib/terminal/pages";

// Served to curl, wget, and HTTPie by src/proxy.ts.
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) => {
  const { path = [] } = await params;
  const { lines, status } = await renderTerminalPage(path);
  const body = toText(lines);

  return new Response(
    req.nextUrl.searchParams.has("plain") ? stripAnsi(body) : body,
    {
      status,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        Vary: "User-Agent",
      },
    },
  );
};
