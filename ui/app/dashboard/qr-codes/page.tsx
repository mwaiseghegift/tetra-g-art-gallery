"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import { getArtworks } from "@/lib/api/artworks";
import { createQRCode, deleteQRCode, getQRCodes } from "@/lib/api/qrCodes";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork, QRCode } from "@/lib/api/types";

function qrImageUrl(uniqueId: string) {
  const target =
    typeof window !== "undefined"
      ? `${window.location.origin}/qr/${uniqueId}`
      : `/qr/${uniqueId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(target)}`;
}

export default function QRCodesPage() {
  const { accessToken } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtworkId, setSelectedArtworkId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!accessToken) return Promise.resolve();
    return Promise.all([getQRCodes(accessToken), getArtworks()]).then(
      ([qrCodesData, artworksData]) => {
        setQrCodes(qrCodesData);
        setArtworks(artworksData);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const artworksWithoutQr = useMemo(() => {
    const linked = new Set(qrCodes.map((qr) => qr.artwork));
    return artworks.filter((artwork) => !linked.has(artwork.artwork_id));
  }, [artworks, qrCodes]);

  async function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken || !selectedArtworkId) return;

    setError(null);
    setIsGenerating(true);
    try {
      await createQRCode(selectedArtworkId, accessToken);
      await refresh();
      setSelectedArtworkId("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to generate QR code.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleDelete(uniqueId: string) {
    if (!accessToken) return;
    if (!window.confirm("Delete this QR code?")) return;

    setDeletingId(uniqueId);
    try {
      await deleteQRCode(uniqueId, accessToken);
      await refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <h2 className="mb-4 font-serif text-xl text-offwhite">Generate QR Code</h2>
        {artworksWithoutQr.length === 0 && !isLoading ? (
          <p className="text-sm text-offwhite/50">
            Every artwork already has a QR code.
          </p>
        ) : (
          <form onSubmit={handleGenerate} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Select
                id="artwork"
                label="Artwork"
                value={selectedArtworkId}
                onChange={(e) => setSelectedArtworkId(e.target.value)}
                required
              >
                <option value="">Select an artwork…</option>
                {artworksWithoutQr.map((artwork) => (
                  <option key={artwork.artwork_id} value={artwork.artwork_id}>
                    {artwork.title} ({artwork.artwork_id})
                  </option>
                ))}
              </Select>
            </div>
            <Button type="submit" variant="primary" className="text-xs" disabled={isGenerating}>
              {isGenerating ? "Generating…" : "Generate QR Code"}
            </Button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
      </Card>

      {isLoading ? (
        <p className="text-sm text-offwhite/50">Loading…</p>
      ) : qrCodes.length === 0 ? (
        <Card>
          <p className="text-sm text-offwhite/50">No QR codes generated yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qrCodes.map((qr) => (
            <Card key={qr.unique_id} className="flex flex-col items-center gap-4 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrImageUrl(qr.unique_id)}
                alt={`QR code for ${qr.artwork_detail.title}`}
                className="h-40 w-40 rounded-lg bg-offwhite p-2"
              />
              <div>
                <p className="font-serif text-lg text-offwhite">{qr.artwork_detail.title}</p>
                <p className="text-xs uppercase tracking-wide text-offwhite/40">
                  {qr.artwork}
                </p>
              </div>
              <p className="text-xs text-offwhite/50">{qr.scans_count} scans</p>
              <div className="flex gap-4">
                <a
                  href={qrImageUrl(qr.unique_id)}
                  download={`${qr.artwork}-qr.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium uppercase tracking-wide text-gold hover:underline"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(qr.unique_id)}
                  disabled={deletingId === qr.unique_id}
                  className="text-xs font-medium uppercase tracking-wide text-terracotta hover:underline disabled:opacity-50"
                >
                  {deletingId === qr.unique_id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
