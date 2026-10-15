import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_DB_ENDPOINT as string,
  token: process.env.UPSTASH_DB_TOKEN as string,
});