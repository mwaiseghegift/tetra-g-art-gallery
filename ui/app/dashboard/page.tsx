"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getArtworks } from "@/lib/api/artworks";
import { getCollections } from "@/lib/api/collections";
import { getQRCodes } from "@/lib/api/qrCodes";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork, Collection, QRCode } from "@/lib/api/types";

export default function DashboardHomePage() {
  const { accessToken } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    let active = true;

    Promise.all([getArtworks(), getCollections(), getQRCodes(accessToken)])
      .then(([artworksData, collectionsData, qrCodesData]) => {
        if (!active) return;
        setArtworks(artworksData);
        setCollections(collectionsData);
        setQrCodes(qrCodesData);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [accessToken]);

  const totalViews = artworks.reduce((sum, artwork) => sum + artwork.views_count, 0);
  const totalLikes = artworks.reduce((sum, artwork) => sum + artwork.likes_count, 0);
  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scans_count, 0);
  const recentArtworks = artworks.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Artworks" value={isLoading ? "—" : artworks.length} />
        <StatCard label="Collections" value={isLoading ? "—" : collections.length} />
        <StatCard label="Total Views" value={isLoading ? "—" : totalViews} />
        <StatCard
          label="QR Scans"
          value={isLoading ? "—" : totalScans}
          hint={`${totalLikes} likes across all artworks`}
        />
      </div>

      <Card>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-offwhite">Recent Artworks</h2>
          <Button href="/dashboard/artworks" variant="outline" className="text-xs">
            View all
          </Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-offwhite/50">Loading…</p>
        ) : recentArtworks.length === 0 ? (
          <p className="text-sm text-offwhite/50">
            No artworks yet.{" "}
            <Link href="/dashboard/artworks/new" className="text-gold hover:underline">
              Add your first artwork
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-offwhite/10">
            {recentArtworks.map((artwork) => (
              <li key={artwork.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-serif text-lg text-offwhite">{artwork.title}</p>
                  <p className="text-xs uppercase tracking-wide text-offwhite/40">
                    {artwork.artwork_id} · {artwork.medium} · {artwork.year}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div className="text-xs text-offwhite/50">
                    <p>{artwork.views_count} views</p>
                    <p>{artwork.likes_count} likes</p>
                  </div>
                  <Link
                    href={`/dashboard/artworks/${artwork.artwork_id}`}
                    className="text-xs font-medium uppercase tracking-wide text-gold hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
