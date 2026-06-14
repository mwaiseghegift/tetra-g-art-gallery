import { API_ENDPOINTS } from "@/lib/config/apis";
import { apiFetch } from "./client";
import type { QRCode } from "./types";

export function getQRCodes(token: string) {
  return apiFetch<QRCode[]>(API_ENDPOINTS.qrCodes.list, { token });
}

export function getQRCode(uniqueId: string) {
  return apiFetch<QRCode>(API_ENDPOINTS.qrCodes.detail(uniqueId));
}

export function createQRCode(artworkId: string, token: string) {
  return apiFetch<QRCode>(API_ENDPOINTS.qrCodes.list, {
    method: "POST",
    body: { artwork: artworkId },
    token,
  });
}

export function deleteQRCode(uniqueId: string, token: string) {
  return apiFetch<void>(API_ENDPOINTS.qrCodes.detail(uniqueId), { method: "DELETE", token });
}
