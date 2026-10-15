import { type NextRequest, NextResponse } from "next/server";
import {
  findEmojiEntry,
  getEmojiImageUrl,
  getEmojiMetadata,
  normalizeEmojiQuery,
  validateEmojiSize,
  validateEmojiStyle,
} from "@/lib/emoji/lookup";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ lookup: string }> },
) => {
  const styleResult = validateEmojiStyle(
    req.nextUrl.searchParams.get("style") || "apple",
  );

  if (!styleResult.valid) {
    return NextResponse.json(
      { data: null, error: styleResult.error },
      { status: 400 },
    );
  }

  const size = req.nextUrl.searchParams.get("size") || "64";
  const sizeResult = validateEmojiSize(styleResult.style, size);

  if (!sizeResult.valid) {
    return NextResponse.json(
      { data: null, error: sizeResult.error },
      { status: 400 },
    );
  }

  const { lookup: query } = await params;
  const normalized = normalizeEmojiQuery(query);

  if (normalized.error) {
    return NextResponse.json(
      { data: null, error: normalized.error },
      { status: 400 },
    );
  }

  const entry = findEmojiEntry(normalized.data);

  if (!entry) {
    return NextResponse.json(
      { data: null, error: "Invalid lookup" },
      { status: 404 },
    );
  }

  if (!entry.image) {
    return NextResponse.json(
      { data: null, error: "No image found" },
      { status: 404 },
    );
  }

  const asJson = req.nextUrl.searchParams.get("asJson");

  if (asJson) {
    return NextResponse.json(
      {
        data: getEmojiMetadata(entry),
        error: null,
      },
      { status: 200 },
    );
  }

  const url = getEmojiImageUrl(styleResult.style, size, entry.image);
  const image = await fetch(url, {
    next: {
      revalidate: 60 * 60 * 24 * 7,
      tags: ["all", "emoji", `emoji:${entry.short_name}`],
    },
  });

  if (!image.ok) {
    return NextResponse.json(
      { data: null, error: "Failed to fetch emoji image" },
      { status: 400 },
    );
  }

  const imageBlob = new Blob([new Uint8Array(await image.arrayBuffer())], {
    type: "image/png",
  });

  return new Response(imageBlob, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};