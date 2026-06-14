import { API_ENDPOINTS } from "@/lib/config/apis";
import { apiFetch } from "./client";
import type { Signature } from "./types";

export function getSignatures(token: string) {
  return apiFetch<Signature[]>(API_ENDPOINTS.signatures.list, { token });
}

export function getSignature(uniqueId: string) {
  return apiFetch<Signature>(API_ENDPOINTS.signatures.detail(uniqueId));
}

export function createSignature(
  data: { artwork: string; signature_image: string },
  token: string
) {
  return apiFetch<Signature>(API_ENDPOINTS.signatures.list, {
    method: "POST",
    body: data,
    token,
  });
}

export function updateSignature(
  uniqueId: string,
  data: Partial<Pick<Signature, "signature_image" | "is_verified">>,
  token: string
) {
  return apiFetch<Signature>(API_ENDPOINTS.signatures.detail(uniqueId), {
    method: "PATCH",
    body: data,
    token,
  });
}

export function deleteSignature(uniqueId: string, token: string) {
  return apiFetch<void>(API_ENDPOINTS.signatures.detail(uniqueId), { method: "DELETE", token });
}
