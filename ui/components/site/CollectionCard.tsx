import Link from "next/link";
import type { Collection } from "@/lib/api/types";
import { ArrowRightIcon, FrameIcon } from "@/components/ui/Icons";

type CollectionCardProps = {
  collection: Collection;
  variant?: "strip" | "grid";
};

export default function CollectionCard({
  collection,
  variant = "strip",
}: CollectionCardProps) {
  return (
    <Link
      href={`/gallery?collection=${collection.slug}`}
      className={`group relative block overflow-hidden rounded-2xl border border-offwhite/10 ${
        variant === "strip"
          ? "aspect-4/5 shrink-0 basis-64 sm:basis-72"
          : "aspect-4/5 sm:aspect-square"
      }`}
    >
      {collection.cover_image ? (
        <img
          src={collection.cover_image}
          alt={collection.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-charcoal-soft via-charcoal to-charcoal-soft">
          <span className="font-serif text-3xl italic text-offwhite/15">
            {collection.name.slice(0, 1)}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/30 to-transparent" />

      <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-charcoal/70 text-gold backdrop-blur-sm">
        <FrameIcon className="h-4 w-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-6 sm:p-8">
        <div>
          <h3 className="font-serif text-2xl text-offwhite sm:text-3xl">{collection.name}</h3>
          {variant === "grid" && collection.description && (
            <p className="mt-2 max-w-sm text-sm text-offwhite/60 line-clamp-2">
              {collection.description}
            </p>
          )}
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-sand">
            {collection.artworks_count} {collection.artworks_count === 1 ? "Work" : "Works"}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal">
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
