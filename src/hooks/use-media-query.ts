"use client";

import * as React from "react";

/** Returns `null` until mounted so SSR and the first client render match. */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
