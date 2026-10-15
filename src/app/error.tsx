"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/layout/error-page";
import { Button } from "@/components/ui/button";

export default function Error({
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
    <ErrorPage
      code="Error"
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. You can try again or head back home."
      actions={
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="outline" onClick={() => unstable_retry()}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Back home</a>
          </Button>
        </div>
      }
    />
  );
}