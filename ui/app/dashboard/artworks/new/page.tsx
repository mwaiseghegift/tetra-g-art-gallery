"use client";

import { useRouter } from "next/navigation";
import ArtworkForm from "@/components/dashboard/ArtworkForm";
import { createArtwork } from "@/lib/api/artworks";
import { useAuth } from "@/lib/auth/AuthContext";
import type { ArtworkInput } from "@/lib/api/types";

export default function NewArtworkPage() {
  const router = useRouter();
  const { accessToken } = useAuth();

  async function handleSubmit(data: ArtworkInput) {
    if (!accessToken) return;
    const artwork = await createArtwork(data, accessToken);
    router.push(`/dashboard/artworks/${artwork.artwork_id}`);
  }

  return <ArtworkForm onSubmit={handleSubmit} submitLabel="Create Artwork" />;
}
