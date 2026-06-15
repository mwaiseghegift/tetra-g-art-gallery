"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArtworkForm from "@/components/dashboard/ArtworkForm";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { deleteArtwork, getArtwork, updateArtwork } from "@/lib/api/artworks";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork, ArtworkInput } from "@/lib/api/types";

const availabilityLabels: Record<Artwork["availability"], string> = {
  available: "Available",
  sold: "Sold",
  not_for_sale: "Not for Sale",
};

function Field({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-sand">{label}</p>
      <p className="mt-1 whitespace-pre-line text-sm text-offwhite">{value}</p>
    </div>
  );
}

export default function ArtworkDetailDashboardPage() {
  const { artworkId } = useParams<{ artworkId: string }>();
  const router = useRouter();
  const { accessToken } = useAuth();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    getArtwork(artworkId)
      .then(setArtwork)
      .finally(() => setIsLoading(false));
  }, [artworkId]);

  async function handleSubmit(data: ArtworkInput) {
    if (!accessToken) return;
    const updated = await updateArtwork(artworkId, data, accessToken);
    setArtwork(updated);
    setMode("view");
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
          {mode === "edit" ? "Editing " : ""}
          <span className="text-offwhite">{artwork.title}</span> ({artwork.artwork_id})
        </p>
        <div className="flex items-center gap-3">
          {mode === "view" ? (
            <Button type="button" variant="primary" className="text-xs" onClick={() => setMode("edit")}>
              Edit Artwork
            </Button>
          ) : (
            <Button type="button" variant="outline" className="text-xs" onClick={() => setMode("view")}>
              Cancel
            </Button>
          )}
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
      </div>

      {mode === "edit" ? (
        <ArtworkForm initialValues={artwork} onSubmit={handleSubmit} submitLabel="Save Changes" />
      ) : (
        <div className="flex flex-col gap-6">
          {artwork.image && (
            <Card className="overflow-hidden p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={artwork.image} alt={artwork.title} className="max-h-120 w-full object-cover" />
            </Card>
          )}

          <Card className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Title" value={artwork.title} />
            <Field label="Subtitle" value={artwork.subtitle} />
            <Field label="Medium" value={artwork.medium} />
            <Field label="Year" value={artwork.year} />
            <Field label="Dimensions" value={artwork.dimensions} />
            <Field label="Edition" value={artwork.edition} />
            <Field label="Origin" value={artwork.origin} />
            <Field label="Creation Time" value={artwork.creation_time} />
            <Field label="Availability" value={availabilityLabels[artwork.availability]} />
            <Field label="Collection" value={artwork.collection} />
            <Field label="Verified" value={artwork.is_verified ? "Yes" : "No"} />
            <Field label="Views / Likes" value={`${artwork.views_count} / ${artwork.likes_count}`} />
          </Card>

          <Card className="flex flex-col gap-4">
            <Field label="Description" value={artwork.description} />
            <Field label="Story" value={artwork.story} />
            <Field label="Materials" value={artwork.materials} />
            <Field label="Framing" value={artwork.framing} />
            <Field label="Artist's Statement" value={artwork.artist_statement} />
          </Card>

          {artwork.sections.length > 0 && (
            <Card className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-sand">Story Sections</p>
              {artwork.sections.map((section) => (
                <div key={section.id}>
                  <p className="font-serif text-base text-offwhite">{section.heading}</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-offwhite/70">{section.body}</p>
                </div>
              ))}
            </Card>
          )}

          {artwork.symbolism_entries.length > 0 && (
            <Card className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-sand">Colour &amp; Symbolism</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artwork.symbolism_entries.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3">
                    <span
                      className="mt-1 h-6 w-6 shrink-0 rounded-full border border-offwhite/20"
                      style={{ backgroundColor: entry.swatch || undefined }}
                    />
                    <div>
                      <p className="text-sm text-offwhite">{entry.label}</p>
                      <p className="text-xs text-offwhite/60">{entry.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {artwork.gallery_images.length > 0 && (
            <Card className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-sand">Gallery Images</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artwork.gallery_images.map((item) => (
                  <figure key={item.id} className="overflow-hidden rounded-lg border border-offwhite/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.caption} className="h-40 w-full object-cover" />
                    {item.caption && (
                      <figcaption className="px-3 py-2 text-xs text-offwhite/60">{item.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Card>
          )}

          {artwork.video && (
            <Card className="overflow-hidden p-0">
              <video src={artwork.video} controls className="w-full" />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
