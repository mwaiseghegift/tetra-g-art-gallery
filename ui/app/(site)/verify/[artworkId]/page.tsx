import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/site/SectionLabel";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { getArtwork } from "@/lib/api/artworks";
import { ApiError } from "@/lib/api/client";
import type { Artwork } from "@/lib/api/types";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, visualArtworkSchema } from "@/lib/seo/schema";

type VerifyPageProps = {
  params: Promise<{ artworkId: string }>;
};

export async function generateMetadata({
  params,
}: VerifyPageProps): Promise<Metadata> {
  const { artworkId } = await params;

  try {
    const artwork = await getArtwork(artworkId);

    return createMetadata({
      title: `Verify ${artwork.title} | Tetra Art`,
      description: `Verify ${artwork.artwork_id}, ${artwork.title} by Tetra, and view its digital signature and authentication status.`,
      path: `/verify/${artwork.artwork_id}`,
      image: artwork.og_image || artwork.image || undefined,
    });
  } catch {
    return createMetadata({
      title: `Verify ${artworkId} | Tetra Art`,
      description:
        "Verify a Tetra artwork ID and view its QR-linked authentication record.",
      path: `/verify/${artworkId}`,
    });
  }
}

export default async function VerifyArtworkPage({ params }: VerifyPageProps) {
  const { artworkId } = await params;
  let artwork: Artwork;

  try {
    artwork = await getArtwork(artworkId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <>
      <JsonLd
        data={[
          visualArtworkSchema(artwork),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verification", path: `/verify/${artwork.artwork_id}` },
          ]),
        ]}
      />
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-12">
        <SectionLabel align="center">Artwork Verification</SectionLabel>
        <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 text-gold">
          <ShieldCheckIcon className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-serif text-5xl sm:text-6xl">
          {artwork.is_verified ? "Verified Original" : "Verification Pending"}
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.24em] text-gold">
          {artwork.artwork_id}
        </p>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-sand">
          {artwork.title}, {artwork.medium}, {artwork.year}, by Tetra.
        </p>
        <Link
          href={`/artwork/${artwork.artwork_id}`}
          className="mt-8 inline-flex rounded-full border border-gold/40 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
        >
          View Artwork Record
        </Link>
      </section>
    </>
  );
}
