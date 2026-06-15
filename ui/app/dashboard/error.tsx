"use client";

import { useEffect } from "react";
import ErrorState from "@/components/layout/ErrorState";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function DashboardError({
  error,
  unstable_retry,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      eyebrow="Dashboard Error"
      title="The admin workspace hit a snag."
      message="Your session is still protected, but this dashboard view could not finish rendering. Retry the panel or return to the dashboard overview."
      details={error.digest ? `Error digest: ${error.digest}` : undefined}
      compact
      actions={[
        {
          label: "Retry Panel",
          onClick: unstable_retry,
        },
        {
          label: "Dashboard Home",
          href: "/dashboard",
          variant: "outline",
        },
      ]}
    />
  );
}
