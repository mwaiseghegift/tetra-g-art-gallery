"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import StatCard from "@/components/dashboard/StatCard";
import { EyeIcon, HeartIcon, QrIcon } from "@/components/ui/Icons";
import { getArtworks } from "@/lib/api/artworks";
import { getQRCodes } from "@/lib/api/qrCodes";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork, QRCode } from "@/lib/api/types";

export default function AnalyticsPage() {
  const { accessToken } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    Promise.all([getArtworks(), getQRCodes(accessToken)])
      .then(([artworksData, qrCodesData]) => {
        setArtworks(artworksData);
        setQrCodes(qrCodesData);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  const totalViews = artworks.reduce((sum, artwork) => sum + artwork.views_count, 0);
  const totalLikes = artworks.reduce((sum, artwork) => sum + artwork.likes_count, 0);
  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scans_count, 0);

  const mostViewed = [...artworks].sort((a, b) => b.views_count - a.views_count).slice(0, 5);
  const mostLiked = [...artworks].sort((a, b) => b.likes_count - a.likes_count).slice(0, 5);
  const mostScanned = [...qrCodes].sort((a, b) => b.scans_count - a.scans_count).slice(0, 5);

  if (isLoading) {
    return <p className="text-sm text-offwhite/50">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Views" value={totalViews} icon={<EyeIcon className="h-5 w-5" />} />
        <StatCard label="Total Likes" value={totalLikes} icon={<HeartIcon className="h-5 w-5" />} />
        <StatCard label="Total QR Scans" value={totalScans} icon={<QrIcon className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="mb-4 font-serif text-xl text-offwhite">Most Viewed</h2>
          <RankedList
            items={mostViewed.map((artwork) => ({
              key: artwork.id,
              label: artwork.title,
              value: `${artwork.views_count} views`,
            }))}
          />
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl text-offwhite">Most Liked</h2>
          <RankedList
            items={mostLiked.map((artwork) => ({
              key: artwork.id,
              label: artwork.title,
              value: `${artwork.likes_count} likes`,
            }))}
          />
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl text-offwhite">Most Scanned</h2>
          <RankedList
            items={mostScanned.map((qr) => ({
              key: qr.id,
              label: qr.artwork_detail.title,
              value: `${qr.scans_count} scans`,
            }))}
          />
        </Card>
      </div>
    </div>
  );
}

type RankedListProps = {
  items: { key: number; label: string; value: string }[];
};

function RankedList({ items }: RankedListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-offwhite/50">No data yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={item.key} className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-3 text-offwhite/80">
            <span className="text-xs text-gold">{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </span>
          <span className="text-offwhite/50">{item.value}</span>
        </li>
      ))}
    </ol>
  );
}
