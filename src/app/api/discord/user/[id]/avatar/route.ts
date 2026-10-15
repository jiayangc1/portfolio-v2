import { type NextRequest, NextResponse } from "next/server";
import { getDiscordUser } from "@/lib/discord/get-discord-user";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const size = request.nextUrl.searchParams.get("size") || "512";
  const discordId = (await params).id;

  if (
    Math.log2(Number.parseInt(size)) % 1 !== 0 ||
    Number.parseInt(size) < 16 ||
    Number.parseInt(size) > 4096
  ) {
    return NextResponse.json(
      { data: null, error: "Invalid size" },
      { status: 400 },
    );
  }

  if (!discordId) {
    return NextResponse.json(
      { data: null, error: "No Discord ID provided" },
      { status: 400 },
    );
  }

  const result = await getDiscordUser(discordId);

  if (!result.data) {
    return NextResponse.json(
      { data: null, error: result.error },
      { status: 400 },
    );
  }

  const returnUrl = `https://cdn.discordapp.com/avatars/${discordId}/${result.data.avatar}?size=${size}`;
  const image = await fetch(returnUrl, {
    next: {
      revalidate: 60 * 60 * 24 * 7,
      tags: ["all", "discord", "discord:avatars", `discord:avatar:${discordId}`],
    },
  });

  const imageBlob = new Blob([new Uint8Array(await image.arrayBuffer())], {
    type: "image/png",
  });

  return new NextResponse(imageBlob, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};