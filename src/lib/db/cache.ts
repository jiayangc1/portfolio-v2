import { Redis } from "@upstash/redis";

export const cache = new Redis({
  url: process.env.UPSTASH_CACHE_ENDPOINT as string,
  token: process.env.UPSTASH_CACHE_TOKEN as string,
});