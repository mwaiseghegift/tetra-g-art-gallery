import type { UploadSignature } from "@/lib/api/types";

export class CloudinaryUploadError extends Error {}

/**
 * Uploads a file directly to Cloudinary using a signature obtained from
 * the backend (POST /api/uploads/signature/). Returns the resulting
 * secure URL, which can be stored in an artwork's `image`/`video` field.
 */
export async function uploadToCloudinary(
  file: File,
  signature: UploadSignature
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.api_key);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloud_name}/auto/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw new CloudinaryUploadError(data?.error?.message ?? "Upload to Cloudinary failed.");
  }

  return data.secure_url as string;
}
