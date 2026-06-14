import { API_ENDPOINTS } from "@/lib/config/apis";
import { apiFetch } from "./client";
import type { UploadSignature } from "./types";

export function getUploadSignature(folder: string, token: string) {
  return apiFetch<UploadSignature>(API_ENDPOINTS.uploads.signature, {
    method: "POST",
    body: { folder },
    token,
  });
}
