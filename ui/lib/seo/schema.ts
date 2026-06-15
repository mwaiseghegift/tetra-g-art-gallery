import type { Artwork, Collection } from "@/lib/api/types";
import { ARTIST_NAME, absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME } from "./site";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: DEFAULT_DESCRIPTION,
    publisher: personSchema(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/gallery")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ARTIST_NAME,
    alternateName: "Tetra G Arts",
    url: absoluteUrl("/about"),
    sameAs: [
      "https://www.instagram.com/tetrag_arts",
      "https://www.youtube.com/@tetrag_arts",
      "https://www.tiktok.com/@tetrag_arts",
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function visualArtworkSchema(artwork: Artwork) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    alternateName: artwork.artwork_id,
    url: absoluteUrl(`/artwork/${artwork.artwork_id}`),
    image: artwork.image ? absoluteUrl(artwork.image) : undefined,
    creator: personSchema(),
    artist: ARTIST_NAME,
    artMedium: artwork.medium,
    dateCreated: String(artwork.year),
    description: artwork.description || artwork.story,
    identifier: artwork.artwork_id,
    isAccessibleForFree: true,
    material: artwork.materials || undefined,
  };
}

export function collectionPageSchema(collections: Collection[], path = "/collections") {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tetra Art Collections",
    url: absoluteUrl(path),
    hasPart: collections.map((collection) => ({
      "@type": "CreativeWorkSeries",
      name: collection.name,
      description: collection.description,
      image: collection.cover_image ? absoluteUrl(collection.cover_image) : undefined,
      url: absoluteUrl(`/gallery?collection=${collection.slug}`),
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? absoluteUrl(image) : undefined,
    url: absoluteUrl(path),
    author: personSchema(),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function artworkImageAlt(artwork: Pick<Artwork, "title" | "medium" | "year">) {
  return `${artwork.title}, ${artwork.medium}, ${artwork.year}, by ${ARTIST_NAME}`;
}
