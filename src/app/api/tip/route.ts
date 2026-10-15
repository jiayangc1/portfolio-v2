import { NextResponse } from "next/server";
import tips from "@/data/tips.json";

export const GET = async () => {
  return new NextResponse(
    tips.tips[Math.floor(Math.random() * tips.tips.length)],
  );
};