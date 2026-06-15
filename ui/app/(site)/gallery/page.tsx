import Button from "@/components/ui/Button";
import CollectionCard from "@/components/site/CollectionCard";
import EmptyState from "@/components/site/EmptyState";
import SectionLabel from "@/components/site/SectionLabel";
import { ArrowRightIcon, QrIcon } from "@/components/ui/Icons";
import { getArtworks } from "@/lib/api/artworks";
import { getCollections } from "@/lib/api/collections";
import type { Artwork, Collection } from "@/lib/api/types";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import {
  artworkImageAlt,
  breadcrumbSchema,
  collectionPageSchema,
} from "@/lib/seo/schema";
import GalleryExplorer from "./GalleryExplorer";

type GalleryPageProps = {
  searchParams: Promise<{ collection?: string }>;
};

export const metadata = createMetadata({
  title: "Gallery | Tetra Art",
  description:
    "Browse original Tetra artworks by collection, story, medium, and year, with QR-linked authentication records for each physical piece.",
  path: "/gallery",
});

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { collection } = await searchParams;

  const [artworks, collections] = await Promise.all([
    getArtworks().catch((): Artwork[] => []),
    getCollections().catch((): Collection[] => []),
  ]);

  const totalViews = artworks.reduce((sum, a) => sum + a.views_count, 0);
  const totalLikes = artworks.reduce((sum, a) => sum + a.likes_count, 0);
  const sampleArtwork = artworks.find((a) => a.image);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
          collectionPageSchema(collections, "/gallery"),
        ]}
      />
      {/* Header */}
      <section className="relative overflow-hidden border-b border-offwhite/10">
        <img
          src={sampleArtwork?.image || "/images/IMG_5848.jpg"}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/90 via-charcoal/78 to-charcoal/95" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/82 to-charcoal/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,162,74,0.18),transparent_34%)]" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(245,241,234,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.75)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute inset-y-0 left-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 text-center lg:px-12 lg:py-16">
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            The Gallery of Tetra
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sand italic">
            Each piece is a fragment of identity, memory, and emotion —
            step inside and look closer.
          </p>
        </div>
      </section>

      {/* Explorer */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <GalleryExplorer
          artworks={artworks}
          collections={collections}
          initialCollection={collection}
        />
      </section>

      {/* Scan. Discover. Experience. */}
      <section className="border-y border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-12">
          <div className="flex items-center justify-center">
            <div className="relative aspect-9/16 w-52 overflow-hidden rounded-4xl border-4 border-charcoal bg-charcoal shadow-2xl">
              {sampleArtwork ? (
                <img
                  src={sampleArtwork.image}
                  alt={artworkImageAlt(sampleArtwork)}
                  className="h-full w-full object-cover opacity-70"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-charcoal-soft to-charcoal" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-charcoal/50 p-6 text-center">
                <div className="rounded-xl bg-offwhite p-3">
                  <QrIcon className="h-16 w-16 text-charcoal" />
                </div>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-gold">
                  Scan to Unlock
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Scan. Discover. Experience.</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Every Artwork Is Connected to a{" "}
              <span className="italic text-gold">Living Story.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-offwhite/60">
              Every piece in this gallery carries a QR code linked to its
              digital identity. Scan it on the physical artwork to unlock its
              meaning, creation process, and verified authenticity.
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Authentic · Traceable · Forever
            </p>
          </div>
        </div>
      </section>

      {/* Collections preview */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Explore Collections</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Themed Series &amp; Bodies of Work
            </h2>
          </div>
          <Button href="/collections" variant="outline" className="text-xs">
            View All Collections
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Button>
        </div>

        {collections.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No collections yet"
              message="Themed collections will appear here once they're added."
            />
          </div>
        ) : (
          <div className="mt-10 flex gap-6 overflow-x-auto pb-2">
            {collections.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        )}
      </section>

      {/* Engagement stats */}
      <section className="border-y border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 text-center lg:grid-cols-4 lg:px-12">
          {[
            { label: "Artworks", value: artworks.length },
            { label: "Collections", value: collections.length },
            { label: "Total Views", value: totalViews },
            { label: "Total Likes", value: totalLikes },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl text-gold sm:text-4xl">
                {stat.value.toLocaleString()}
                {stat.label !== "Artworks" && stat.label !== "Collections"
                  ? "+"
                  : ""}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sand">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-gold to-terracotta text-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Explore Beyond <span className="italic">the Canvas.</span>
            </h2>
            <p className="mt-3 max-w-md text-charcoal/80">
              Interested in owning a piece or creating something meaningful
              together? Let&apos;s bring your vision to life.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              href="/collections"
              variant="primary"
              className="border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:text-charcoal!"
            >
              View Collections
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              Commission Art
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
