import ErrorState from "@/components/layout/ErrorState";

export default function DashboardNotFound() {
  return (
    <ErrorState
      eyebrow="404 / Dashboard"
      title="That dashboard panel does not exist."
      message="The admin route may have changed, or the management view has not been built yet."
      code="404"
      compact
      actions={[
        {
          label: "Dashboard Home",
          href: "/dashboard",
        },
        {
          label: "Manage Artworks",
          href: "/dashboard/artworks",
          variant: "outline",
        },
      ]}
    />
  );
}
