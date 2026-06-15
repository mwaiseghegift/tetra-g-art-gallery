import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtworkCard from "@/components/site/ArtworkCard";
import SectionLabel from "@/components/site/SectionLabel";
import Button from "@/components/ui/Button";
import {
  ArrowRightIcon,
  BrushIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  DropletIcon,
  FrameIcon,
  LayersIcon,
  PaletteIcon,
  PencilIcon,
  PinIcon,
  PlayIcon,
  QrIcon,
  RulerIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";
import { getArtwork } from "@/lib/api/artworks";
import { getCollection, getCollectionArtworks } from "@/lib/api/collections";
import { ApiError } from "@/lib/api/client";
import type { Artwork, Collection } from "@/lib/api/types";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import {
  artworkImageAlt,
  breadcrumbSchema,
  visualArtworkSchema,
} from "@/lib/seo/schema";
import { truncateDescription } from "@/lib/seo/site";
import ArtworkViewer from "./ArtworkViewer";

type ArtworkPageProps = {
  params: Promise<{ artworkId: string }>;
};

const availabilityLabels: Record<Artwork["availability"], string> = {
  available: "Original Available",
  sold: "Sold",
  not_for_sale: "Not for Sale",
};

const journeyStages = [
  { label: "Initial Sketch", Icon: PencilIcon },
  { label: "Layering Textures", Icon: LayersIcon },
  { label: "Building Depth", Icon: DropletIcon },
  { label: "Adding Details", Icon: PaletteIcon },
  { label: "Final Touches", Icon: BrushIcon },
  { label: "The Final Piece", Icon: FrameIcon },
];

function getArtworkDescription(artwork: Artwork) {
  const status = artwork.is_verified
    ? "Verified original artwork"
    : "Artwork authentication record";
  const source =
    artwork.meta_description ||
    artwork.description ||
    artwork.story ||
    `${artwork.title} is a ${artwork.year} ${artwork.medium} artwork by Tetra.`;

  return truncateDescription(
    `${source} ${status} ${artwork.artwork_id}.`
  );
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { artworkId } = await params;

  try {
    const artwork = await getArtwork(artworkId);
    const title =
      artwork.meta_title ||
      `${artwork.title} (${artwork.year}) | ${artwork.medium} | Tetra Art`;

    return createMetadata({
      title,
      description: getArtworkDescription(artwork),
      path: `/artwork/${artwork.artwork_id}`,
      image: artwork.og_image || artwork.image || undefined,
    });
  } catch {
    return createMetadata({
      title: `${artworkId} | Tetra Art`,
      description:
        "View the artwork story, digital signature, and QR-linked authentication record for this original Tetra artwork.",
      path: `/artwork/${artworkId}`,
    });
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArtworkDetailPage({ params }: ArtworkPageProps) {
  const { artworkId } = await params;

  let artwork: Artwork;
  try {
    artwork = await getArtwork(artworkId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  let collection: Collection | null = null;
  let relatedArtworks: Artwork[] = [];

  if (artwork.collection) {
    [collection, relatedArtworks] = await Promise.all([
      getCollection(artwork.collection).catch((): Collection | null => null),
      getCollectionArtworks(artwork.collection).catch((): Artwork[] => []),
    ]);
    relatedArtworks = relatedArtworks
      .filter((item) => item.artwork_id !== artwork.artwork_id)
      .slice(0, 4);
  }

  const storyParagraphs = artwork.story
    ? artwork.story.split(/\n+/).filter(Boolean)
    : [];

  const metadataCards = [
    { label: "Medium", value: artwork.medium, Icon: PaletteIcon },
    { label: "Year", value: String(artwork.year), Icon: CalendarIcon },
    { label: "Dimensions", value: artwork.dimensions, Icon: RulerIcon },
    { label: "Origin", value: artwork.origin || "—", Icon: PinIcon },
    { label: "Creation Time", value: artwork.creation_time || "—", Icon: ClockIcon },
    {
      label: "Availability",
      value: availabilityLabels[artwork.availability],
      Icon: ShieldCheckIcon,
    },
    ...(artwork.edition
      ? [{ label: "Edition", value: artwork.edition, Icon: LayersIcon }]
      : []),
    ...(artwork.materials
      ? [{ label: "Materials", value: artwork.materials, Icon: DropletIcon }]
      : []),
    ...(artwork.framing
      ? [{ label: "Framing", value: artwork.framing, Icon: FrameIcon }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          visualArtworkSchema(artwork),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
            { name: artwork.title, path: `/artwork/${artwork.artwork_id}` },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="border-b border-offwhite/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center lg:px-12">
          {/* Metadata rail */}
          <div className="flex flex-col gap-6">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-sand transition-colors duration-300 hover:text-gold"
            >
              <ChevronLeftIcon className="h-3.5 w-3.5" />
              Back to Gallery
            </Link>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                {collection ? collection.name : "Original Artwork"}
              </p>
              <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">
                {artwork.title}
              </h1>
              {artwork.subtitle && (
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-offwhite/50">
                  {artwork.subtitle}
                </p>
              )}
              <p className="mt-2 font-serif text-lg italic text-sand">
                By <span className="text-gold">Tetra</span>
              </p>
            </div>

            {artwork.description && (
              <p className="max-w-md text-sm leading-relaxed text-offwhite/60">
                {artwork.description}
              </p>
            )}

            <div className="h-px w-full bg-offwhite/10" />

            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand">Year</dt>
                <dd className="mt-1 font-serif text-lg">{artwork.year}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand">Medium</dt>
                <dd className="mt-1 font-serif text-lg">{artwork.medium}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand">Dimensions</dt>
                <dd className="mt-1 font-serif text-lg">{artwork.dimensions}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-sand">Series</dt>
                <dd className="mt-1 font-serif text-lg">
                  {collection ? collection.name : "—"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Viewer */}
          <ArtworkViewer artwork={artwork} />
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>The Story Behind This Piece</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              {artwork.title}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-offwhite/70">
              {storyParagraphs.length > 0 ? (
                storyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p className="text-offwhite/40">
                  The story behind this piece hasn&apos;t been added yet.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {metadataCards.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-2xl border border-offwhite/10 bg-charcoal-soft p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-sand">{label}</p>
                  <p className="mt-1 font-serif text-base text-offwhite">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story sections (e.g. THE MEDIUM, COMPOSITION & FORM, THE FRAME) */}
      {artwork.sections.length > 0 && (
        <section className="border-t border-offwhite/10 bg-charcoal-soft">
          <div className="mx-auto max-w-4xl space-y-12 px-6 py-20 lg:px-12">
            {artwork.sections.map((section) => (
              <div key={section.id}>
                <SectionLabel>{section.heading}</SectionLabel>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-offwhite/70">
                  {section.body
                    .split(/\n+/)
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Colour & symbolism */}
      {artwork.symbolism_entries.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <SectionLabel>Colour &amp; Symbolism</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            Every Shade Carries Intention
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artwork.symbolism_entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 rounded-2xl border border-offwhite/10 bg-charcoal-soft p-5"
              >
                <span
                  className="mt-1 h-8 w-8 shrink-0 rounded-full border border-offwhite/20"
                  style={{ backgroundColor: entry.swatch || undefined }}
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{entry.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-offwhite/70">{entry.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detail gallery */}
      {artwork.gallery_images.length > 0 && (
        <section className="border-t border-offwhite/10 bg-charcoal-soft">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
            <SectionLabel>A Closer Look</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Detail Gallery</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artwork.gallery_images.map((item) => (
                <figure key={item.id} className="overflow-hidden rounded-2xl border border-offwhite/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.caption || artworkImageAlt(artwork)}
                    className="h-64 w-full object-cover"
                  />
                  {item.caption && (
                    <figcaption className="px-4 py-3 text-xs text-offwhite/60">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Artist's statement */}
      {artwork.artist_statement && (
        <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-12">
          <p className="font-serif text-2xl italic leading-relaxed text-offwhite sm:text-3xl">
            &ldquo;{artwork.artist_statement}&rdquo;
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
            Artist&apos;s Statement · Tetra G Arts
          </p>
        </section>
      )}

      {/* Verification + QR experience */}
      <section className="border-y border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2 lg:px-12">
          {/* Verification card */}
          <div className="rounded-3xl border border-gold/30 bg-offwhite p-8 text-charcoal shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-terracotta">
              <ShieldCheckIcon className="h-4 w-4" />
              Verified Original Artwork
            </div>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
                  Unique ID
                </p>
                <p className="mt-1 font-mono text-sm text-charcoal">
                  {artwork.artwork_id}
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-charcoal/50">
                  Date Created
                </p>
                <p className="mt-1 text-sm text-charcoal">
                  {formatDate(artwork.created_at)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-serif text-4xl italic text-charcoal">Tetra</p>
                <span
                  className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] ${
                    artwork.is_verified
                      ? "bg-charcoal text-gold"
                      : "bg-charcoal/10 text-charcoal/60"
                  }`}
                >
                  <ShieldCheckIcon className="h-3 w-3" />
                  {artwork.is_verified ? "Authenticated by Artist" : "Pending Verification"}
                </span>
              </div>
            </div>

            <p className="mt-6 border-t border-charcoal/10 pt-4 text-xs leading-relaxed text-charcoal/60">
              This artwork is digitally signed and verified by Tetra. Scan the
              QR code on the physical artwork to view its story and
              authenticity record.
            </p>
          </div>

          {/* QR experience */}
          <div className="flex flex-col justify-center">
            <SectionLabel>Scan to Unlock the Full Experience</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Authentic.{" "}
              <span className="italic text-gold">Traceable. Forever.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-offwhite/60">
              Every physical piece is connected to its digital identity
              through QR technology. Scanning the code on{" "}
              <span className="text-offwhite">{artwork.title}</span> confirms
              its authenticity and links back to this story.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-charcoal">
                <QrIcon className="h-10 w-10 text-gold" />
              </div>
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey of Creation */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>The Journey of Creation</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              From Sketch to Final Piece
            </h2>
          </div>
          {artwork.video && (
            <a
              href={artwork.video}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-charcoal"
            >
              <PlayIcon className="h-3.5 w-3.5" />
              Watch Time-lapse Video
            </a>
          )}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {journeyStages.map(({ label, Icon }, index) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon className="h-6 w-6" />
                {index < journeyStages.length - 1 && (
                  <span className="absolute left-full top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gold/20 lg:block" />
                )}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-sand">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* More from this collection */}
      {relatedArtworks.length > 0 && (
        <section className="border-t border-offwhite/10 bg-charcoal-soft">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>More From This Collection</SectionLabel>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  {collection?.name}
                </h2>
              </div>
              <Button
                href={`/gallery?collection=${artwork.collection}`}
                variant="outline"
                className="text-xs"
              >
                View Collection
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedArtworks.map((related) => (
                <ArtworkCard key={related.id} artwork={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-gold to-terracotta text-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Connect With <span className="italic">the Artist.</span>
            </h2>
            <p className="mt-3 max-w-md text-charcoal/80">
              Interested in owning a piece like this, or creating something
              unique?
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              href="/contact"
              variant="primary"
              className="border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:text-charcoal!"
            >
              Commission Similar Artwork
            </Button>
            <Button
              href="/gallery"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              View Full Gallery
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              Contact Tetra
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
