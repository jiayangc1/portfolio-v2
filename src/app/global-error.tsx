"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { ErrorPage } from "@/components/layout/error-page";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <ErrorPage
          code="Error"
          title="Something went wrong"
          description="A critical error occurred. You can try again or return to the homepage."
          actions={
            <>
              <span className="sr-only">{error.message}</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => unstable_retry()}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-foreground/7 bg-background px-2.5 font-medium text-sm transition-all hover:bg-foreground/5"
                >
                  Try again
                </button>
                <a
                  href="/"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-foreground/7 bg-background px-2.5 font-medium text-sm transition-all hover:bg-foreground/5"
                >
                  Back home
                </a>
              </div>
            </>
          }
        />
      </body>
    </html>
  );
}
