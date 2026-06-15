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
      <section className="relative isolate overflow-hidden border-b border-offwhite/10 bg-charcoal">
        <img
          src={heroCollection?.cover_image || "/images/IMG_3903.jpg"}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45 grayscale"
        />
        <div className="absolute inset-0 bg-gold/20 mix-blend-color" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/94 via-charcoal/82 to-charcoal/96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(200,162,74,0.3),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(198,90,58,0.22),transparent_34%)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-gold/45 via-offwhite/10 to-transparent" />
        <div className="absolute inset-x-0 top-8 mx-auto hidden h-24 max-w-5xl rounded-full border border-gold/20 opacity-60 lg:block" />
        <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle,rgba(245,241,234,0.65)_1px,transparent_1.5px)] bg-[size:28px_28px]" />
        <div className="absolute inset-y-0 left-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 text-center lg:grid-cols-[16rem_minmax(0,1fr)_16rem] lg:items-center lg:px-12 lg:py-20">
          <div className="hidden rotate-[-8deg] overflow-hidden rounded-2xl border border-offwhite/10 bg-charcoal/70 p-2 shadow-2xl shadow-black/30 lg:block">
            <img
              src="/images/IMG_3057.jpg"
              alt=""
              className="h-56 w-full object-cover grayscale"
            />
          </div>

          <div>
            <SectionLabel align="center">Collections</SectionLabel>
            <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
              Curated Themes &amp; Series
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sand italic">
              Each collection is a thread of memory, identity, and emotion —
              grouped artworks that belong to the same story.
            </p>
          </div>

          <div className="hidden rotate-[7deg] overflow-hidden rounded-2xl border border-gold/25 bg-charcoal/70 p-2 shadow-2xl shadow-black/30 lg:block">
            <img
              src={heroCollection?.cover_image || "/images/IMG_3903.jpg"}
              alt=""
              className="h-56 w-full object-cover grayscale"
            />
          </div>
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
