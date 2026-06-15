import Button from "@/components/ui/Button";
import EmptyState from "@/components/site/EmptyState";
import SectionLabel from "@/components/site/SectionLabel";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

export const metadata = createMetadata({
  title: "Blog & Journal | Tetra Art",
  description:
    "Read Tetra Art journal entries about process, recycled materials, exhibitions, African-inspired storytelling, and artwork authentication.",
  path: "/blog",
  image: "/images/IMG_3903.jpg",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          articleSchema({
            title: "Tetra Art Blog & Journal",
            description:
              "Artist reflections, behind-the-scenes process notes, and updates from Tetra Art.",
            path: "/blog",
            image: "/images/IMG_3903.jpg",
          }),
        ]}
      />
      <section className="border-b border-offwhite/10">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-12">
          <SectionLabel align="center">Blog &amp; Journal</SectionLabel>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Notes From the Studio
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-sand">
            Reflections on sustainable materials, visual storytelling,
            exhibitions, and the making of verified original artworks.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-12">
        <EmptyState
          title="No journal posts yet"
          message="Artist reflections and process notes will appear here once published."
        />
        <div className="mt-8 flex justify-center">
          <Button href="/gallery" variant="outline">
            Explore Gallery
          </Button>
        </div>
      </section>
    </>
  );
}
