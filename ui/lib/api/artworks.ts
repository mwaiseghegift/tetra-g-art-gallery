import { API_ENDPOINTS } from "@/lib/config/apis";
import { apiFetch } from "./client";
import type { Artwork, ArtworkInput } from "./types";

export function getArtworks() {
  return apiFetch<Artwork[]>(API_ENDPOINTS.artworks.list);
}

export function getArtwork(artworkId: string) {
  return apiFetch<Artwork>(API_ENDPOINTS.artworks.detail(artworkId));
}

export function createArtwork(data: ArtworkInput, token: string) {
  return apiFetch<Artwork>(API_ENDPOINTS.artworks.list, { method: "POST", body: data, token });
}

export function updateArtwork(artworkId: string, data: ArtworkInput, token: string) {
  return apiFetch<Artwork>(API_ENDPOINTS.artworks.detail(artworkId), {
    method: "PATCH",
    body: data,
    token,
  });
}

export function deleteArtwork(artworkId: string, token: string) {
  return apiFetch<void>(API_ENDPOINTS.artworks.detail(artworkId), { method: "DELETE", token });
}
