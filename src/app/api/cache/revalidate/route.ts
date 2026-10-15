import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthorizedRequest, unauthorizedResponse } from "@/lib/api/auth";

export const POST = async (request: NextRequest) => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const { tags }: { tags: string[] } = await request.json();

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json(
    {
      data: true,
      error: null,
    },
    { status: 202 },
  );
};