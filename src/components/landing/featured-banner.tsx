import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContentBox } from "@/components/layout/shell";

const FEATURED_ACCENT = "#CCF24A";

export const FeaturedBanner = () => {
  return (
    <ContentBox className="relative overflow-hidden p-0" position="middle">
      <Link
        href="https://authometry.jiayangchen.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Check out Authometry"
        className="featured-banner-link relative block overflow-hidden px-4 py-2.5 sm:px-5 sm:py-3"
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="featured-banner-pattern" />
          <div className="featured-banner-pattern-mid" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-1 text-center sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3 sm:text-left">
          <div className="flex min-w-0 flex-col items-center gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="inline-flex shrink-0 items-baseline font-mono font-semibold text-sm text-white tracking-tight">
              Authometry
              <span
                className="-top-0.5 relative animate-[featured-cursor-blink_1.1s_step-end_infinite]"
                style={{ color: FEATURED_ACCENT }}
                aria-hidden
              >
                _
              </span>
            </span>

            <span
              className="hidden shrink-0 text-white/30 sm:inline"
              aria-hidden
            >
              ·
            </span>

            <p className="text-sm text-white/95 tracking-tight">
              OAuth you can see. Inspect every OAuth 2.0 and OIDC request.
            </p>
          </div>

          <span className="hidden shrink-0 sm:flex">
            <ArrowUpRight aria-hidden className="size-5 text-white" />
          </span>
        </div>
      </Link>
    </ContentBox>
  );
};
