import { getStatusPayload } from "@/lib/status/fetch";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getStatusPayload();
  return Response.json(status);
}
