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
import { getArtworks } from "@/lib/api/artworks";
import { getCollections } from "@/lib/api/collections";
import type { Artwork, Collection } from "@/lib/api/types";

const journalPosts = [
  {
    date: "May 10, 2024",
    title: "Why I believe African art belongs in digital museums",
    excerpt:
      "Exploring how QR-linked storytelling preserves meaning long after a piece leaves the studio.",
  },
  {
    date: "April 28, 2024",
    title: "Behind the brush: my creative process",
    excerpt:
      "From sketch to final piece — a look at how texture, colour and memory come together on canvas.",
  },
  {
    date: "April 15, 2024",
    title: "The power of storytelling through art",
    excerpt:
      "Every artwork carries a voice. Here's how I translate identity and heritage into visual language.",
  },
];

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
    .slice(0, 4);
  const heroArtwork = featured[0] ?? artworks[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-offwhite/10">
        <div className="absolute inset-0 bg-linear-to-br from-charcoal via-charcoal to-charcoal-soft" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-32">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              African Stories. Global Soul.
            </p>

            <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Art That Lives Beyond{" "}
              <span className="italic text-gold">the Canvas.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-sand">
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
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute inset-0 rounded-full border border-gold/20" />

            {heroArtwork?.image ? (
              <img
                src={heroArtwork.image}
                alt={heroArtwork.title}
                className="relative h-full w-full rounded-full object-cover shadow-2xl shadow-black/50"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-gold/20 bg-charcoal-soft">
                <span className="font-serif text-6xl italic text-gold/30">
                  Tetra
                </span>
              </div>
            )}

            {heroArtwork && (
              <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-gold/30 bg-charcoal/80 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur">
                {heroArtwork.title}
              </div>
            )}
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
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </section>

      {/* Scan to Experience */}
      <section className="border-y border-offwhite/10 bg-offwhite text-charcoal">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-3 lg:items-center lg:px-12">
          <div>
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
              className="mt-8 text-charcoal!"
            >
              Learn How QR Works
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative aspect-9/16 w-52 overflow-hidden rounded-4xl border-4 border-charcoal bg-charcoal shadow-2xl">
              {heroArtwork?.image ? (
                <img
                  src={heroArtwork.image}
                  alt={heroArtwork.title}
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
                  Verified Original
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {scanFeatures.map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/15 text-terracotta">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg text-charcoal">{title}</h3>
                  <p className="mt-1 text-sm text-charcoal/60">{text}</p>
                </div>
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
          <div className="mt-10 flex gap-6 overflow-x-auto pb-2">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </section>

      {/* From the Journal */}
      <section className="border-t border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>From the Journal</SectionLabel>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Stories &amp; Reflections
              </h2>
            </div>
            <Button href="/journal" variant="outline" className="text-xs">
              View All Posts
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {journalPosts.map((post) => (
              <article
                key={post.title}
                className="flex flex-col gap-3 rounded-2xl border border-offwhite/10 bg-charcoal p-6 transition-colors duration-300 hover:border-gold/30"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-sand">
                  {post.date}
                </p>
                <h3 className="font-serif text-xl leading-snug text-offwhite">
                  {post.title}
                </h3>
                <p className="text-sm text-offwhite/60">{post.excerpt}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  Read More
                  <ArrowRightIcon className="h-3 w-3" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-gold to-terracotta text-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Let&apos;s Create Something{" "}
              <span className="italic">Meaningful.</span>
            </h2>
            <p className="mt-3 max-w-md text-charcoal/80">
              Interested in owning a piece like this, or creating something
              unique together? Let&apos;s bring your vision to life.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              href="/contact"
              variant="primary"
              className="border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:text-charcoal!"
            >
              Commission Art
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
