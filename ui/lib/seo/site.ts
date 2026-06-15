export const SITE_NAME = "Tetra Art";

export const DEFAULT_TITLE =
  "Tetra Art | African-Inspired Digital Art Portfolio";

export const DEFAULT_DESCRIPTION =
  "Explore original artworks by Tetra, each connected to its story, meaning, digital signature, and QR-linked authentication record.";

export const ARTIST_NAME = "Tetra";

export const DEFAULT_OG_IMAGE = "/images/IMG_5848.jpg";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function truncateDescription(value: string, maxLength = 155) {
  const compact = value.replace(/\s+/g, " ").trim();

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, maxLength - 1).trimEnd()}…`;
}
