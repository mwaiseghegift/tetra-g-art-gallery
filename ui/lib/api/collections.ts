import { API_ENDPOINTS } from "@/lib/config/apis";
import { apiFetch } from "./client";
import type { Artwork, Collection, CollectionInput } from "./types";

export function getCollections() {
  return apiFetch<Collection[]>(API_ENDPOINTS.collections.list);
}

export function getCollection(slug: string) {
  return apiFetch<Collection>(API_ENDPOINTS.collections.detail(slug));
}

export function getCollectionArtworks(slug: string) {
  return apiFetch<Artwork[]>(API_ENDPOINTS.collections.artworks(slug));
}

export function createCollection(data: CollectionInput, token: string) {
  return apiFetch<Collection>(API_ENDPOINTS.collections.list, {
    method: "POST",
    body: data,
    token,
  });
}

export function updateCollection(slug: string, data: CollectionInput, token: string) {
  return apiFetch<Collection>(API_ENDPOINTS.collections.detail(slug), {
    method: "PATCH",
    body: data,
    token,
  });
}

export function deleteCollection(slug: string, token: string) {
  return apiFetch<void>(API_ENDPOINTS.collections.detail(slug), { method: "DELETE", token });
}
