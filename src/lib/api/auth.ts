import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function isAuthorizedRequest() {
  const availableHeaders = await headers();
  const authorization = availableHeaders.get("ted-ac-identity");
  return Boolean(authorization && authorization === process.env.TED_AC);
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      data: null,
      error: "Unauthorized",
    },
    { status: 401 },
  );
}