"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

      <Card className="overflow-x-auto p-0">
        {isLoading ? (
          <p className="p-6 text-sm text-offwhite/50">Loading…</p>
        ) : artworks.length === 0 ? (
          <p className="p-6 text-sm text-offwhite/50">
            No artworks yet.{" "}
            <Link href="/dashboard/artworks/new" className="text-gold hover:underline">
              Add your first artwork
            </Link>
            .
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-offwhite/10 text-xs uppercase tracking-wide text-sand">
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Medium</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium">Availability</th>
                <th className="px-6 py-4 font-medium">Verified</th>
                <th className="px-6 py-4 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-offwhite/5">
              {artworks.map((artwork) => (
                <tr key={artwork.id}>
                  <td className="px-6 py-4 font-serif text-base text-offwhite">
                    {artwork.title}
                  </td>
                  <td className="px-6 py-4 text-offwhite/60">{artwork.artwork_id}</td>
                  <td className="px-6 py-4 text-offwhite/60">{artwork.medium}</td>
                  <td className="px-6 py-4 text-offwhite/60">{artwork.year}</td>
                  <td className="px-6 py-4 capitalize text-offwhite/60">
                    {artwork.availability.replace(/_/g, " ")}
                  </td>
                  <td className="px-6 py-4">
                    {artwork.is_verified ? (
                      <span className="text-gold">Yes</span>
                    ) : (
                      <span className="text-offwhite/40">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
