"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import DataTable, { type DataTableColumn } from "@/components/dashboard/DataTable";
import { deleteArtwork, getArtworks } from "@/lib/api/artworks";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork } from "@/lib/api/types";

export default function ManageArtworksPage() {
  const { accessToken } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getArtworks()
      .then(setArtworks)
      .finally(() => setIsLoading(false));
  }, []);

  async function handleDelete(artworkId: string) {
    if (!accessToken) return;
    if (!window.confirm("Delete this artwork? This cannot be undone.")) return;

    setDeletingId(artworkId);
    try {
      await deleteArtwork(artworkId, accessToken);
      setArtworks((prev) => prev.filter((artwork) => artwork.artwork_id !== artworkId));
    } finally {
      setDeletingId(null);
    }
  }

  const columns: DataTableColumn<Artwork>[] = [
    {
      key: "artwork",
      header: "Artwork",
      render: (artwork) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-offwhite/10 bg-charcoal">
            {artwork.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={artwork.image} alt="" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div>
            <p className="font-serif text-base text-offwhite">{artwork.title}</p>
            <p className="text-xs uppercase tracking-wide text-offwhite/40">{artwork.artwork_id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "medium",
      header: "Medium",
      render: (artwork) => <span className="text-offwhite/60">{artwork.medium}</span>,
    },
    {
      key: "year",
      header: "Year",
      render: (artwork) => <span className="text-offwhite/60">{artwork.year}</span>,
    },
    {
      key: "availability",
      header: "Availability",
      render: (artwork) => (
        <span className="capitalize text-offwhite/60">{artwork.availability.replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "verified",
      header: "Verified",
      render: (artwork) =>
        artwork.is_verified ? (
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold">
            Yes
          </span>
        ) : (
          <span className="rounded-full bg-offwhite/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-offwhite/40">
            No
          </span>
        ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (artwork) => (
        <div className="flex items-center justify-end gap-4">
          <Link
            href={`/dashboard/artworks/${artwork.artwork_id}`}
            className="text-xs font-medium uppercase tracking-wide text-gold hover:underline"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(artwork.artwork_id)}
            disabled={deletingId === artwork.artwork_id}
            className="text-xs font-medium uppercase tracking-wide text-terracotta hover:underline disabled:opacity-50"
          >
            {deletingId === artwork.artwork_id ? "Deleting…" : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-offwhite/50">
          {isLoading ? "Loading…" : `${artworks.length} artworks`}
        </p>
        <Button href="/dashboard/artworks/new" variant="primary" className="text-xs">
          New Artwork
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={artworks}
        keyExtractor={(artwork) => artwork.id}
        isLoading={isLoading}
        emptyTitle="No artworks yet"
        emptyMessage="Add your first artwork to start building the gallery."
      />
    </div>
  );
}
