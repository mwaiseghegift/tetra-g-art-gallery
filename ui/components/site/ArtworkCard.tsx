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
      className="group relative block overflow-hidden rounded-2xl border border-offwhite/10 bg-charcoal-soft transition-colors duration-300 hover:border-gold/30"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {artwork.image ? (
          <img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal-soft via-charcoal to-charcoal-soft">
            <span className="font-serif text-3xl italic text-offwhite/15">
              {artwork.title.slice(0, 1)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent opacity-90" />

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

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-serif text-lg text-offwhite">{artwork.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-sand">
            {artwork.medium} · {artwork.year}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            View Story
            <ArrowRightIcon className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
