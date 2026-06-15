"use client";

import { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ErrorState from "@/components/layout/ErrorState";

type RootErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function RootError({ error, unstable_retry }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ErrorState
          eyebrow="Site Error"
          title="Something interrupted the gallery."
          message="The page could not finish loading. You can try again, or return to a stable gallery route while we keep the artwork records intact."
          details={error.digest ? `Error digest: ${error.digest}` : undefined}
          actions={[
            {
              label: "Try Again",
              onClick: unstable_retry,
            },
            {
              label: "Go to Gallery",
              href: "/gallery",
              variant: "outline",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
