import ErrorState from "@/components/layout/ErrorState";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function SiteNotFound() {
  return (
    <ErrorState
      eyebrow="404 / Artwork Not Found"
      title="No matching artwork record was found."
      message="That link may point to an artwork ID, QR code, or verification record that has not been published yet."
      code="404"
      actions={[
        {
          label: "Search Gallery",
          href: "/gallery",
          icon: <ArrowRightIcon className="h-3.5 w-3.5" />,
        },
        {
          label: "View Collections",
          href: "/collections",
          variant: "outline",
        },
        {
          label: "Verify QR Code",
          href: "/qr-info",
          variant: "outline",
        },
      ]}
    />
  );
}
