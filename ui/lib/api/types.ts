export type Availability = "available" | "sold" | "not_for_sale";

export interface ArtworkSection {
  id: number;
  heading: string;
  body: string;
  order: number;
}

export interface ArtworkSymbolismEntry {
  id: number;
  label: string;
  meaning: string;
  swatch: string;
  order: number;
}

export interface ArtworkGalleryImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Artwork {
  id: number;
  unique_id: string;
  artwork_id: string;
  title: string;
  subtitle: string;
  slug: string;
  medium: string;
  year: number;
  dimensions: string;
  edition: string;
  materials: string;
  framing: string;
  collection: string | null;
  description: string;
  story: string;
  artist_statement: string;
  origin: string;
  creation_time: string;
  availability: Availability;
  image: string;
  video: string;
  is_verified: boolean;
  views_count: number;
  likes_count: number;
  sections: ArtworkSection[];
  symbolism_entries: ArtworkSymbolismEntry[];
  gallery_images: ArtworkGalleryImage[];
  created_at: string;
  updated_at: string;
}

export type ArtworkSectionInput = Partial<Pick<ArtworkSection, "id">> &
  Omit<ArtworkSection, "id">;

export type ArtworkSymbolismEntryInput = Partial<Pick<ArtworkSymbolismEntry, "id">> &
  Omit<ArtworkSymbolismEntry, "id">;

export type ArtworkGalleryImageInput = Partial<Pick<ArtworkGalleryImage, "id">> &
  Omit<ArtworkGalleryImage, "id">;

export type ArtworkInput = Partial<
  Pick<
    Artwork,
    | "title"
    | "subtitle"
    | "medium"
    | "year"
    | "dimensions"
    | "edition"
    | "materials"
    | "framing"
    | "collection"
    | "description"
    | "story"
    | "artist_statement"
    | "origin"
    | "creation_time"
    | "availability"
    | "image"
    | "video"
    | "is_verified"
  >
> & {
  sections?: ArtworkSectionInput[];
  symbolism_entries?: ArtworkSymbolismEntryInput[];
  gallery_images?: ArtworkGalleryImageInput[];
};

export interface Collection {
  id: number;
  unique_id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  artworks_count: number;
  created_at: string;
  updated_at: string;
}

export type CollectionInput = Partial<
  Pick<Collection, "name" | "description" | "cover_image">
>;

export interface QRCode {
  id: number;
  unique_id: string;
  artwork: string;
  artwork_detail: Artwork;
  scans_count: number;
  created_at: string;
}

export interface Signature {
  id: number;
  unique_id: string;
  artwork: string;
  artwork_detail: Artwork;
  signature_image: string;
  is_verified: boolean;
  verified_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface RegisterInput {
  username: string;
  email?: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UploadSignature {
  signature: string;
  timestamp: number;
  api_key: string;
  cloud_name: string;
  folder: string;
}
