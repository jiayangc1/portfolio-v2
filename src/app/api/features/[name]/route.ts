import { type NextRequest, NextResponse } from "next/server";
import { isAuthorizedRequest, unauthorizedResponse } from "@/lib/api/auth";
import { redis } from "@/lib/db/redis";
import { tryCatch } from "@/lib/try-catch";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const { data, error } = await tryCatch(redis.get((await params).name));

  return NextResponse.json({
    data,
    error,
  });
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const body: { enabled: boolean } = await request.json();
  const { data, error } = await tryCatch(
    redis.set((await params).name, body.enabled),
  );

  return NextResponse.json({
    data,
    error,
  });
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const body: { enabled: boolean } = await request.json();
  const { data, error } = await tryCatch(
    redis.set((await params).name, body.enabled),
  );

  return NextResponse.json({
    data,
    error,
  });
};

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) => {
  if (!(await isAuthorizedRequest())) return unauthorizedResponse();

  const { data, error } = await tryCatch(redis.del((await params).name));

  return NextResponse.json({
    data,
    error,
  });
};