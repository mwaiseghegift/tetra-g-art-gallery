import Button from "@/components/ui/Button";
import CollectionCard from "@/components/site/CollectionCard";
import EmptyState from "@/components/site/EmptyState";
import SectionLabel from "@/components/site/SectionLabel";
import { getCollections } from "@/lib/api/collections";
import type { Collection } from "@/lib/api/types";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/seo/schema";

export const metadata = createMetadata({
  title: "Collections | Tetra Art",
  description:
    "Explore Tetra Art collections and series grouped by theme, memory, identity, sustainability, and African-inspired visual storytelling.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const collections = await getCollections().catch((): Collection[] => []);
  const heroCollection = collections.find((collection) => collection.cover_image);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
          ]),
          collectionPageSchema(collections),
        ]}
      />
      {/* Header */}
      <section className="relative overflow-hidden border-b border-offwhite/10">
        <img
          src={heroCollection?.cover_image || "/images/IMG_3903.jpg"}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/92 via-charcoal/78 to-charcoal/96" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/84 to-charcoal/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,162,74,0.18),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(245,241,234,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.75)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-y-0 left-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 text-center lg:px-12 lg:py-16">
          <SectionLabel align="center">Collections</SectionLabel>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Curated Themes &amp; Series
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sand italic">
            Each collection is a thread of memory, identity, and emotion —
            grouped artworks that belong to the same story.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        {collections.length === 0 ? (
          <EmptyState
            title="No collections yet"
            message="Themed collections will appear here once the artist groups artworks into a series."
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                variant="grid"
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-gold to-terracotta text-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Every Series Tells a{" "}
              <span className="italic">Larger Story.</span>
            </h2>
            <p className="mt-3 max-w-md text-charcoal/80">
              Browse the full catalogue or get in touch to commission a piece
              from a series that speaks to you.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              href="/gallery"
              variant="primary"
              className="border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:text-charcoal!"
            >
              View Full Gallery
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              Contact Artist
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
