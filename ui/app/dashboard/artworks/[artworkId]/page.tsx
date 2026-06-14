"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArtworkForm from "@/components/dashboard/ArtworkForm";
import Button from "@/components/ui/Button";
import { deleteArtwork, getArtwork, updateArtwork } from "@/lib/api/artworks";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork, ArtworkInput } from "@/lib/api/types";

export default function EditArtworkPage() {
  const { artworkId } = useParams<{ artworkId: string }>();
  const router = useRouter();
  const { accessToken } = useAuth();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getArtwork(artworkId)
      .then(setArtwork)
      .finally(() => setIsLoading(false));
  }, [artworkId]);

  async function handleSubmit(data: ArtworkInput) {
    if (!accessToken) return;
    const updated = await updateArtwork(artworkId, data, accessToken);
    setArtwork(updated);
  }

  async function handleDelete() {
    if (!accessToken) return;
    if (!window.confirm("Delete this artwork? This cannot be undone.")) return;

    setIsDeleting(true);
    try {
      await deleteArtwork(artworkId, accessToken);
      router.push("/dashboard/artworks");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return <p className="text-sm text-offwhite/50">Loading…</p>;
  }

  if (!artwork) {
    return <p className="text-sm text-offwhite/50">Artwork not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-offwhite/50">
          Editing <span className="text-offwhite">{artwork.title}</span> ({artwork.artwork_id})
        </p>
        <Button
          type="button"
          variant="outline"
          className="border-terracotta/40 text-terracotta hover:border-terracotta hover:text-terracotta text-xs"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting…" : "Delete Artwork"}
        </Button>
      </div>

      <ArtworkForm initialValues={artwork} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}
