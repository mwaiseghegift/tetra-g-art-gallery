import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ErrorState from "@/components/layout/ErrorState";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Page Not Found | Tetra Art",
  description:
    "The requested Tetra Art page could not be found. Return to the gallery, browse collections, or verify an artwork record.",
  path: "/not-found",
  noIndex: true,
});

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ErrorState
          eyebrow="404 / Missing Record"
          title="This page slipped beyond the frame."
          message="The route you opened does not match an active gallery page, artwork record, QR destination, or dashboard view."
          code="404"
          actions={[
            {
              label: "Return Home",
              href: "/",
            },
            {
              label: "Browse Gallery",
              href: "/gallery",
              variant: "outline",
              icon: <ArrowRightIcon className="h-3.5 w-3.5" />,
            },
            {
              label: "QR Info",
              href: "/qr-info",
              variant: "outline",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
