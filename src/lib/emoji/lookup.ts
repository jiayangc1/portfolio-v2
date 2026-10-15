import emojiData from "@/data/emojis.json";
import { site } from "@/lib/site";

interface EmojiEntry {
  unified: string;
  non_qualified?: string;
  short_name: string;
  short_names: string[];
  text?: string;
  texts?: string[];
  image?: string;
  category?: string;
  subcategory?: string;
}

const typedEmojiData = emojiData as EmojiEntry[];

const sizeGuidelines = {
  apple: ["160", "64"],
  facebook: ["64", "96"],
  google: ["64", "136"],
  twitter: ["64", "72"],
} as const;

export const validEmojiStyles = new Set(Object.keys(sizeGuidelines));

export type EmojiStyle = keyof typeof sizeGuidelines;

const unifiedToEmoji = (unified: string): string => {
  return unified
    .split("-")
    .map((u) => String.fromCodePoint(Number.parseInt(u, 16)))
    .join("");
};

const styleToFolder = (style: string, size: string): string => {
  switch (style) {
    case "apple":
      return `img-apple-${size}`;
    case "facebook":
      return `img-facebook-${size}`;
    case "google":
      return `img-google-${size}`;
    case "twitter":
      return `img-twitter-${size}`;
    default:
      return `img-${style}-${size}`;
  }
};

const matchEmoji = (query: string, entry: EmojiEntry): boolean => {
  const unifiedEmoji = unifiedToEmoji(entry.unified);
  const nonQualifiedEmoji = entry.non_qualified
    ? unifiedToEmoji(entry.non_qualified)
    : null;

  return (
    entry.unified?.toLowerCase() === query ||
    entry.non_qualified?.toLowerCase() === query ||
    entry.short_name?.toLowerCase() === query ||
    entry.short_names?.some((name: string) => name.toLowerCase() === query) ||
    (entry.text && entry.text === query) ||
    (entry.texts && entry.texts.includes(query)) ||
    unifiedEmoji === query ||
    nonQualifiedEmoji === query
  );
};

export function normalizeEmojiQuery(query: string) {
  try {
    return {
      data: decodeURIComponent(query).toLowerCase(),
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Malformed lookup string" as const,
    };
  }
}

export function validateEmojiStyle(style: string) {
  if (!validEmojiStyles.has(style)) {
    return { valid: false as const, error: "Invalid style" as const };
  }

  return { valid: true as const, style: style as EmojiStyle };
}

export function validateEmojiSize(style: EmojiStyle, size: string) {
  const sizeGuideline = sizeGuidelines[style];

  if (!(sizeGuideline as readonly string[]).includes(size)) {
    return {
      valid: false as const,
      error: `Size "${size}" is not supported for style "${style}"` as const,
    };
  }

  return { valid: true as const };
}

export function findEmojiEntry(query: string) {
  return typedEmojiData.find((entry) => matchEmoji(query, entry));
}

export function getEmojiImageUrl(style: EmojiStyle, size: string, image: string) {
  return `https://cdn.jsdelivr.net/gh/iamcal/emoji-data/${styleToFolder(style, size)}/${image}`;
}

export function getEmojiMetadata(entry: EmojiEntry) {
  const { short_name, unified, category, subcategory } = entry;

  return {
    name: short_name,
    unified,
    image: `${site.url}/api/emoji/${short_name}`,
    category,
    subcategory,
  };
}