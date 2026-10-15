import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const GET = async () => {
  const file = await readFile(path.join(process.cwd(), "public", "avatar.jpg"));

  return new NextResponse(file, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
