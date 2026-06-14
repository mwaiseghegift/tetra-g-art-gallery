"use client";

import { useMemo, useState } from "react";
import ArtworkCard from "@/components/site/ArtworkCard";
import EmptyState from "@/components/site/EmptyState";
import Button from "@/components/ui/Button";
import { SearchIcon } from "@/components/ui/Icons";
import type { Artwork, Collection } from "@/lib/api/types";

const PAGE_SIZE = 10;

type GalleryExplorerProps = {
  artworks: Artwork[];
  collections: Collection[];
  initialCollection?: string;
};

export default function GalleryExplorer({
  artworks,
  collections,
  initialCollection,
}: GalleryExplorerProps) {
  const mediums = useMemo(
    () => Array.from(new Set(artworks.map((artwork) => artwork.medium).filter(Boolean))),
    [artworks]
  );
  const years = useMemo(
    () =>
      Array.from(new Set(artworks.map((artwork) => artwork.year))).sort(
        (a, b) => b - a
      ),
    [artworks]
  );

  const [medium, setMedium] = useState("all");
  const [collection, setCollection] = useState(initialCollection ?? "all");
  const [year, setYear] = useState("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return artworks.filter((artwork) => {
      if (medium !== "all" && artwork.medium !== medium) return false;
      if (collection !== "all" && artwork.collection !== collection) return false;
      if (year !== "all" && artwork.year !== Number(year)) return false;
      if (query && !artwork.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [artworks, medium, collection, year, search]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <FilterChip
            label="All Works"
            active={medium === "all"}
            onClick={() => {
              setMedium("all");
              setVisibleCount(PAGE_SIZE);
            }}
          />
          {mediums.map((m) => (
            <FilterChip
              key={m}
              label={m}
              active={medium === m}
              onClick={() => {
                setMedium(m);
                setVisibleCount(PAGE_SIZE);
              }}
            />
          ))}

          {collections.length > 0 && (
            <select
              value={collection}
              onChange={(e) => {
                setCollection(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="rounded-full border border-offwhite/15 bg-charcoal-soft px-4 py-2 text-xs font-medium uppercase tracking-wide text-offwhite outline-none transition-colors duration-300 focus:border-gold"
            >
              <option value="all">Series</option>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          {years.length > 0 && (
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="rounded-full border border-offwhite/15 bg-charcoal-soft px-4 py-2 text-xs font-medium uppercase tracking-wide text-offwhite outline-none transition-colors duration-300 focus:border-gold"
            >
              <option value="all">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="relative w-full lg:w-64">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-offwhite/40" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            type="search"
            placeholder="Search artworks..."
            className="w-full rounded-full border border-offwhite/15 bg-charcoal-soft py-2.5 pl-11 pr-4 text-sm text-offwhite placeholder:text-offwhite/30 outline-none transition-colors duration-300 focus:border-gold"
          />
        </div>
      </div>

      {/* Grid */}
      {artworks.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No artworks yet"
            message="The gallery is being curated. Check back soon for new pieces."
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No matching artworks"
            message="Try a different filter, year, or search term."
          />
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Load More Artworks
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
        active
          ? "border-gold bg-gold text-charcoal"
          : "border-offwhite/15 text-offwhite/70 hover:border-gold hover:text-gold"
      }`}
    >
      {label}
    </button>
  );
}
