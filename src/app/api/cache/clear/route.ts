import { NextResponse } from "next/server";
import { isAuthorizedRequest, unauthorizedResponse } from "@/lib/api/auth";
import { cache } from "@/lib/db/cache";

export const POST = async () => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  await cache.flushall();

  return NextResponse.json(
    {
      data: true,
      error: null,
    },
    { status: 202 },
  );
};