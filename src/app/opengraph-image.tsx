import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name.full} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatar = await readFile(join(process.cwd(), "public", "avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        gap: 56,
        padding: 96,
        background: "#242428",
        color: "#fafafa",
        fontFamily: "monospace",
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: ImageResponse requires img */}
      <img
        src={avatarSrc}
        alt=""
        width={240}
        height={240}
        style={{ borderRadius: 32, objectFit: "cover" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{ display: "flex", gap: 24, fontSize: 88, fontWeight: 800 }}
        >
          <span>{site.name.first}</span>
          <span style={{ color: "#a1a1aa", fontWeight: 500 }}>
            {site.name.last}
          </span>
        </div>
        <div style={{ fontSize: 40, color: "#a1a1aa" }}>{site.title}</div>
        <div style={{ fontSize: 28, color: "#71717a", marginTop: 24 }}>
          jiayangchen.com
        </div>
      </div>
    </div>,
    size,
  );
}
