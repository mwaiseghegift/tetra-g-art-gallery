import Button from "@/components/ui/Button";
import ArtworkCard from "@/components/site/ArtworkCard";
import CollectionCard from "@/components/site/CollectionCard";
import EmptyState from "@/components/site/EmptyState";
import SectionLabel from "@/components/site/SectionLabel";
import {
  ArrowRightIcon,
  BookOpenIcon,
  GlobeIcon,
  QrIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";
import { socialLinks } from "@/lib/data/info.data";
import { getArtworks } from "@/lib/api/artworks";
import { getCollections } from "@/lib/api/collections";
import type { Artwork, Collection } from "@/lib/api/types";

const scanFeatures = [
  {
    Icon: BookOpenIcon,
    title: "Story",
    text: "Discover the inspiration and meaning behind each piece.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Authentic",
    text: "Digitally signed by Tetra. Verified and protected.",
  },
  {
    Icon: GlobeIcon,
    title: "Connected",
    text: "Bridging physical art with a digital storytelling experience.",
  },
];

export default async function Home() {
  const [artworks, collections] = await Promise.all([
    getArtworks().catch((): Artwork[] => []),
    getCollections().catch((): Collection[] => []),
  ]);

  const featured = [...artworks]
    .sort((a, b) => b.views_count - a.views_count)
    .slice(0, 3);
  const heroArtwork = featured[0] ?? artworks[0];
  const heroSecondary = featured[1];
  const heroTertiary = featured[2];
  const heroCards = [
    {
      artwork: heroSecondary,
      src: heroSecondary?.image || "/images/IMG_3903.jpg",
      title: heroSecondary?.title || "Ancestral Memory",
      meta: heroSecondary?.artwork_id || "ART-2026-002",
      className:
        "left-[2%] top-[8%] z-0 h-[52%] w-[38%] -rotate-10 opacity-50 blur-[0.2px] sm:left-[5%] lg:left-[3%] lg:top-[15%] lg:h-[56%] lg:w-[34%]",
      tintClass: "bg-gold/45",
    },
    {
      artwork: heroTertiary,
      src: heroTertiary?.image || "/images/IMG_3057.jpg",
      title: heroTertiary?.title || "Inheritance",
      meta: heroTertiary?.artwork_id || "ART-2026-003",
      className:
        "right-[1%] top-[2%] z-10 h-[50%] w-[45%] rotate-7 opacity-85 sm:right-[4%] lg:right-[1%] lg:top-[5%] lg:h-[57%] lg:w-[39%]",
      tintClass: "bg-terracotta/50",
    },
    {
      artwork: heroArtwork,
      src: heroArtwork?.image || "/images/IMG_5848.jpg",
      title: heroArtwork?.title || "Echoes of Her Voice",
      meta: heroArtwork?.artwork_id || "ART-2026-001",
      className:
        "left-[23%] top-[22%] z-30 h-[66%] w-[57%] -rotate-2 sm:left-[25%] lg:left-[25%] lg:top-[22%] lg:h-[69%] lg:w-[50%]",
      tintClass: "bg-gold/55",
      featured: true,
    },
    {
      artwork: artworks[3],
      src: artworks[3]?.image || "/images/IMG_3076.jpg",
      title: artworks[3]?.title || "The Quiet Witness",
      meta: artworks[3]?.artwork_id || "ART-2026-004",
      className:
        "-bottom-[1%] right-[10%] z-20 h-[44%] w-[39%] rotate-12 opacity-65 sm:right-[13%] lg:bottom-[1%] lg:right-[16%] lg:h-[47%] lg:w-[32%]",
      tintClass: "bg-charcoal/20",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-offwhite/10">
        <div className="absolute inset-0 bg-linear-to-br from-charcoal via-[#0d0b09] to-charcoal-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_40%,rgba(200,162,74,0.28),transparent_38%),radial-gradient(circle_at_48%_88%,rgba(198,90,58,0.13),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(245,241,234,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.8)_1px,transparent_1px)] bg-[size:88px_88px]" />
        <div className="absolute -right-20 top-8 hidden h-[70%] w-[48%] rotate-6 overflow-hidden rounded-[2rem] border border-offwhite/5 opacity-15 blur-[1px] lg:block">
          <img
            src={heroArtwork?.image || "/images/IMG_5848.jpg"}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,11,11,0.98) 0%, rgba(11,11,11,0.94) 34%, rgba(11,11,11,0.58) 62%, rgba(11,11,11,0.82) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 h-36 bg-linear-to-t from-charcoal via-charcoal/70 to-transparent" />

        {/* Decorative pattern strip */}
        <div className="absolute inset-y-0 left-0 z-20 hidden w-4 bg-tribal-pattern opacity-50 lg:block" />

        {/* Vertical social rail */}
        <div className="absolute inset-y-0 right-0 z-30 hidden w-16 flex-col items-center justify-center gap-5 border-l border-offwhite/10 lg:flex">
          {socialLinks.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-offwhite/60 transition-colors duration-300 hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <span className="h-16 w-px bg-offwhite/10" />
        </div>

        <div className="relative z-20 mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:py-16 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-16 lg:pr-24 xl:py-20">
          <div className="relative z-30 lg:col-span-5">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
              African Stories. Global Soul.
            </p>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[1.1] sm:text-6xl lg:text-6xl xl:text-7xl">
              Art That Lives Beyond{" "}
              <span className="italic text-gold">the Canvas.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-sand sm:text-lg">
              I create art rooted in emotion, identity, and African
              storytelling traditions reimagined for the digital age.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/gallery" variant="primary">
                Explore Gallery
              </Button>
              <Button href="/about" variant="outline">
                Meet the Artist
              </Button>
            </div>

            <div className="mt-10 hidden max-w-lg grid-cols-3 gap-4 border-t border-offwhite/10 pt-6 text-xs uppercase tracking-[0.2em] text-offwhite/45 sm:grid">
              <span>Signed originals</span>
              <span>QR storytelling</span>
              <span>Digital provenance</span>
            </div>
          </div>

          <div className="relative mx-auto aspect-[7/5] w-full max-w-xl lg:col-span-7 lg:-ml-24 lg:max-w-4xl">
            <div className="absolute inset-[6%] rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute inset-x-[10%] top-[8%] h-px -rotate-6 bg-gold/35" />
            <span className="absolute right-[19%] top-[5%] h-3 w-3 rotate-45 bg-gold/70" />
            <span className="absolute bottom-[16%] left-[21%] h-2.5 w-2.5 rotate-45 border border-gold/60" />
            <span className="absolute right-[8%] top-[43%] h-16 w-px bg-offwhite/15" />

            {heroCards.map((card) => (
              <div
                key={`${card.meta}-${card.title}`}
                className={`group absolute overflow-hidden rounded-2xl border shadow-2xl shadow-black/55 transition-transform duration-700 hover:z-40 hover:-translate-y-2 hover:rotate-0 ${
                  card.featured
                    ? "border-gold/35"
                    : "border-offwhite/10"
                } ${card.className}`}
              >
                <img
                  src={card.src}
                  alt={card.artwork ? card.title : ""}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div
                  className={`absolute inset-0 mix-blend-color ${card.tintClass}`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[0.62rem] font-medium uppercase tracking-[0.22em] text-offwhite">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[0.55rem] uppercase tracking-[0.24em] text-gold/80">
                      {card.meta}
                    </p>
                  </div>
                  {card.featured && (
                    <span className="hidden shrink-0 rounded-full border border-gold/40 bg-charcoal/70 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-gold backdrop-blur sm:inline-flex">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Featured Artworks</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              A Glimpse Into the Gallery
            </h2>
          </div>
          <Button href="/gallery" variant="outline" className="text-xs">
            View All Artworks
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Button>
        </div>

        {featured.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No artworks yet"
              message="Featured pieces will appear here once they're added to the gallery."
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} priority={index === 0} />
            ))}
          </div>
        )}
      </section>

      {/* Scan to Experience */}
      <section className="border-y border-offwhite/10 bg-offwhite text-charcoal">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-4">
            <SectionLabel className="text-terracotta">
              Scan to Experience
            </SectionLabel>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Every Artwork{" "}
              <span className="italic text-terracotta">Has a Voice.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/70">
              Scan the QR code on any physical artwork to unlock its story,
              meaning, and verified authenticity — anytime, anywhere.
            </p>
            <Button
              href="/gallery"
              variant="primary"
              className="mt-8 border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:text-charcoal!"
            >
              How It Works
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="relative flex items-center justify-center py-8 lg:col-span-4">
            <div className="relative aspect-9/16 w-52 overflow-hidden rounded-4xl border-4 border-charcoal bg-charcoal shadow-2xl">
              {heroArtwork?.image ? (
                <img
                  src={heroArtwork.image}
                  alt={heroArtwork.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-charcoal-soft to-charcoal" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/10 to-transparent" />
              {heroArtwork && (
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-offwhite">
                    {heroArtwork.title}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-charcoal/70 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
                    <ShieldCheckIcon className="h-3 w-3" />
                    Verified Original
                  </p>
                </div>
              )}
            </div>

            <div className="absolute -right-2 bottom-10 flex h-24 w-24 rotate-6 items-center justify-center rounded-2xl border border-charcoal/10 bg-offwhite p-3 shadow-xl sm:right-4">
              <QrIcon className="h-full w-full text-charcoal" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-4">
            {scanFeatures.map(({ Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-charcoal/15 text-terracotta">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-serif text-lg text-charcoal">{title}</h3>
                <p className="mt-1 text-sm text-charcoal/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Collections */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Explore Collections</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Curated Themes &amp; Series
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
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="relative overflow-hidden bg-terracotta text-offwhite">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-12">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Let&apos;s Create Something{" "}
              <span className="italic text-gold">Meaningful.</span>
            </h2>
            <p className="mt-3 max-w-md text-offwhite/80">
              Interested in owning a piece like this, or creating something
              unique together? Let&apos;s bring your vision to life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href="/contact"
                variant="primary"
                className="border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:border-offwhite! hover:text-offwhite!"
              >
                Commission Art
              </Button>
              <Button
                href="/contact"
                variant="outline"
                className="border-offwhite/40! text-offwhite! hover:border-charcoal! hover:bg-charcoal! hover:text-offwhite!"
              >
                Contact Me
              </Button>
            </div>
          </div>

          <div className="relative hidden aspect-16/10 overflow-hidden rounded-2xl lg:block">
            <img
              src="/images/IMG_5848.jpg"
              alt="Tetra artworks on display"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-terracotta/20" />
          </div>
        </div>
      </section>
    </>
  );
}
