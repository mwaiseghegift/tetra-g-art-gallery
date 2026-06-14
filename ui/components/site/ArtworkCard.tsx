import Link from "next/link";
import type { Artwork } from "@/lib/api/types";
import { ArrowRightIcon, QrIcon, ShieldCheckIcon } from "@/components/ui/Icons";

type ArtworkCardProps = {
  artwork: Artwork;
  priority?: boolean;
};

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link
      href={`/artwork/${artwork.artwork_id}`}
      className="group relative block rounded-2xl border border-offwhite/10 bg-charcoal-soft p-3 transition-colors duration-300 hover:border-gold/30 sm:p-4"
    >
      {/* Spotlight glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gold/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:bg-gold/15 group-hover:opacity-100" />

      {/* Framed artwork */}
      <div className="relative aspect-4/5 overflow-hidden rounded-sm border border-gold/20 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
        {artwork.image ? (
          <img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal-soft via-charcoal to-charcoal-soft">
            <span className="font-serif text-5xl italic text-offwhite/15">
              {artwork.title.slice(0, 1)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80" />

        <div className="absolute right-3 top-3 flex items-center gap-2">
          {artwork.is_verified && (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/40 bg-charcoal/70 text-gold backdrop-blur-sm">
              <ShieldCheckIcon className="h-4 w-4" />
            </span>
          )}
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/40 bg-charcoal/70 text-gold backdrop-blur-sm">
            <QrIcon className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Museum-style plaque */}
      <div className="flex items-start justify-between gap-3 px-1 pt-4 pb-1 sm:pt-5">
        <div>
          <h3 className="font-serif text-lg leading-snug text-offwhite sm:text-xl">
            {artwork.title}
          </h3>
          <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-sand">
            {artwork.medium} · {artwork.year}
          </p>
          <p className="mt-1 font-serif text-[0.65rem] uppercase tracking-[0.3em] text-offwhite/30">
            {artwork.artwork_id}
          </p>
        </div>
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-charcoal">
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
