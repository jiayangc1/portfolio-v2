"use client";

import * as React from "react";
import type { StatusPayload } from "@/lib/status/types";

const POLL_INTERVAL_MS = 60_000;

export function useStatus(initialStatus?: StatusPayload) {
  const [status, setStatus] = React.useState<StatusPayload | null>(
    initialStatus ?? null,
  );
  const [isLoading, setIsLoading] = React.useState(initialStatus === undefined);

  React.useEffect(() => {
    let active = true;

    const loadStatus = async () => {
      try {
        const response = await fetch("/api/status");
        if (!response.ok || !active) {
          return;
        }

        setStatus((await response.json()) as StatusPayload);
      } catch {
        // Keep the last known status on transient failures.
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadStatus();
    const intervalId = window.setInterval(loadStatus, POLL_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return { status, isLoading };
}
