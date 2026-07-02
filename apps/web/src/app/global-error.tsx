"use client";

import { Button } from "@fullstack-boilerplate/ui/components/button";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-svh items-center justify-center font-sans bg-background text-foreground">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            A critical error occurred. Please try refreshing the page.
          </p>
          <div className="flex gap-2">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Go home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
