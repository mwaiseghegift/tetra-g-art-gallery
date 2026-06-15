import Button from "@/components/ui/Button";
import SectionLabel from "@/components/site/SectionLabel";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, websiteSchema } from "@/lib/seo/schema";

export const metadata = createMetadata({
  title: "QR Artwork Authentication | Tetra Art",
  description:
    "Learn how Tetra Art QR codes connect physical artworks to verified digital records, stories, signatures, and authenticity checks.",
  path: "/qr-info",
});

export default function QRInfoPage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "QR Info", path: "/qr-info" },
          ]),
        ]}
      />
      <section className="border-b border-offwhite/10">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-12">
          <SectionLabel align="center">QR Authentication</SectionLabel>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Every Physical Artwork Has a Digital Record
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-sand">
            Scan the QR code on an original Tetra artwork to open its story,
            unique artwork ID, digital signature, and verification status.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/gallery" variant="primary">
              Browse Verified Artworks
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
