export type Availability = "available" | "sold" | "not_for_sale";

export interface Artwork {
  id: number;
  unique_id: string;
  artwork_id: string;
  title: string;
  slug: string;
  medium: string;
  year: number;
  dimensions: string;
  collection: string | null;
  description: string;
  story: string;
  origin: string;
  creation_time: string;
  availability: Availability;
  image: string;
  is_verified: boolean;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export type ArtworkInput = Partial<
  Pick<
    Artwork,
    | "title"
    | "medium"
    | "year"
    | "dimensions"
    | "collection"
    | "description"
    | "story"
    | "origin"
    | "creation_time"
    | "availability"
    | "image"
    | "is_verified"
  >
>;

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
