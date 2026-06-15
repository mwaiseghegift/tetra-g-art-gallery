import Button from "@/components/ui/Button";
import SectionLabel from "@/components/site/SectionLabel";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";

export const metadata = createMetadata({
  title: "Commissions | Tetra Art",
  description:
    "Request a custom artwork by Tetra, from recycled material portraits to sustainable installations and story-led original pieces.",
  path: "/commissions",
  image: "/images/IMG_3051.jpg",
});

export default function CommissionsPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Commissions", path: "/commissions" },
          ]),
        ]}
      />
      <section className="border-b border-offwhite/10">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-12">
          <SectionLabel align="center">Commissions</SectionLabel>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Commission a Story-Led Artwork
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-sand">
            Work with Tetra on original pieces rooted in memory, identity,
            sustainability, and African-inspired visual storytelling.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="primary">
              Start a Commission
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
