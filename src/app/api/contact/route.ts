import { NextResponse } from "next/server";
import { letsConnectSchema } from "@/components/contact/schema";
import { sendContactEmail } from "@/lib/contact/postmark";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = letsConnectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send message",
      },
      { status: 500 },
    );
  }
}