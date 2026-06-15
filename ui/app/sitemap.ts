import type { MetadataRoute } from "next";
import { getArtworks } from "@/lib/api/artworks";
import { getCollections } from "@/lib/api/collections";
import { absoluteUrl } from "@/lib/seo/site";

const staticPublicRoutes = [
  "/",
  "/gallery",
  "/collections",
  "/about",
  "/contact",
  "/commissions",
  "/blog",
  "/qr-info",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artworks, collections] = await Promise.all([
    getArtworks().catch(() => []),
    getCollections().catch(() => []),
  ]);

  const staticEntries = staticPublicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const artworkEntries = artworks.flatMap((artwork) => {
    const lastModified = artwork.updated_at
      ? new Date(artwork.updated_at)
      : new Date();

    return [
      {
        url: absoluteUrl(`/artwork/${artwork.artwork_id}`),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/verify/${artwork.artwork_id}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      },
    ];
  }) satisfies MetadataRoute.Sitemap;

  const collectionEntries = collections.map((collection) => ({
    url: absoluteUrl(`/gallery?collection=${collection.slug}`),
    lastModified: collection.updated_at
      ? new Date(collection.updated_at)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticEntries, ...artworkEntries, ...collectionEntries];
}
