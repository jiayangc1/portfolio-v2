import { type NextRequest, NextResponse } from "next/server";
import { isAuthorizedRequest, unauthorizedResponse } from "@/lib/api/auth";
import { redis } from "@/lib/db/redis";
import { tryCatch } from "@/lib/try-catch";

export interface FeatureFlag {
  name: string;
  enabled: boolean;
}

export const GET = async () => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const { data, error } = await tryCatch(redis.scan(0));

  return NextResponse.json({
    data: data?.[1] ?? null,
    error,
  });
};

export const POST = async (request: NextRequest) => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const body: FeatureFlag = await request.json();
  const { data, error } = await tryCatch(redis.set(body.name, body.enabled));

  return NextResponse.json({
    data,
    error,
  });
};