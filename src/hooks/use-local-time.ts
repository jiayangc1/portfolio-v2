"use client";

import * as React from "react";

type UseLocalTimeOptions = {
  timezone: string;
  refreshIntervalMs?: number;
};

export function useLocalTime({
  timezone,
  refreshIntervalMs = 1_000,
}: UseLocalTimeOptions) {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const formatTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    formatTime();
    const intervalId = window.setInterval(formatTime, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [timezone, refreshIntervalMs]);

  return time;
}
