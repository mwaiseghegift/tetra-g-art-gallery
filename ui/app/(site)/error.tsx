"use client";

import { useEffect } from "react";
import ErrorState from "@/components/layout/ErrorState";

type SiteErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function SiteError({ error, unstable_retry }: SiteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      eyebrow="Gallery Error"
      title="This gallery view could not load."
      message="A temporary issue stopped this page from rendering. Try the request again, or continue browsing from the main gallery."
      details={error.digest ? `Error digest: ${error.digest}` : undefined}
      actions={[
        {
          label: "Try Again",
          onClick: unstable_retry,
        },
        {
          label: "Browse Gallery",
          href: "/gallery",
          variant: "outline",
        },
      ]}
    />
  );
}
