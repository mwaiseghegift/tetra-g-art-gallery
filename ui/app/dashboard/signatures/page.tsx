"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import DataTable, { type DataTableColumn } from "@/components/dashboard/DataTable";
import MediaInput from "@/components/dashboard/MediaInput";
import { getArtworks } from "@/lib/api/artworks";
import {
  createSignature,
  deleteSignature,
  getSignatures,
  updateSignature,
} from "@/lib/api/signatures";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Artwork, Signature } from "@/lib/api/types";

export default function SignaturesPage() {
  const { accessToken } = useAuth();
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtworkId, setSelectedArtworkId] = useState("");
  const [signatureImage, setSignatureImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!accessToken) return Promise.resolve();
    return Promise.all([getSignatures(accessToken), getArtworks()]).then(
      ([signaturesData, artworksData]) => {
        setSignatures(signaturesData);
        setArtworks(artworksData);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const artworksWithoutSignature = useMemo(() => {
    const signed = new Set(signatures.map((sig) => sig.artwork));
    return artworks.filter((artwork) => !signed.has(artwork.artwork_id));
  }, [artworks, signatures]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken || !selectedArtworkId) return;

    setError(null);
    setIsCreating(true);
    try {
      await createSignature({ artwork: selectedArtworkId, signature_image: signatureImage }, accessToken);
      await refresh();
      setSelectedArtworkId("");
      setSignatureImage("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to create signature.");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleToggleVerified(signature: Signature) {
    if (!accessToken) return;

    setUpdatingId(signature.unique_id);
    try {
      await updateSignature(signature.unique_id, { is_verified: !signature.is_verified }, accessToken);
      await refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(uniqueId: string) {
    if (!accessToken) return;
    if (!window.confirm("Delete this signature?")) return;

    setDeletingId(uniqueId);
    try {
      await deleteSignature(uniqueId, accessToken);
      await refresh();
    } finally {
      setDeletingId(null);
    }
  }

  const columns: DataTableColumn<Signature>[] = [
    {
      key: "artwork",
      header: "Artwork",
      render: (signature) => (
        <div>
          <p className="font-serif text-base text-offwhite">{signature.artwork_detail.title}</p>
          <p className="text-xs uppercase tracking-wide text-offwhite/40">{signature.artwork}</p>
        </div>
      ),
    },
    {
      key: "signature",
      header: "Signature",
      render: (signature) =>
        signature.signature_image ? (
          <a
            href={signature.signature_image}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-gold hover:underline"
          >
            <span className="h-10 w-10 overflow-hidden rounded-lg border border-offwhite/10 bg-charcoal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={signature.signature_image} alt="" className="h-full w-full object-cover" />
            </span>
            View
          </a>
        ) : (
          <span className="text-offwhite/40">—</span>
        ),
    },
    {
      key: "verified",
      header: "Verified",
      render: (signature) => (
        <button
          type="button"
          onClick={() => handleToggleVerified(signature)}
          disabled={updatingId === signature.unique_id}
          className={`rounded-md px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors duration-300 disabled:opacity-50 ${
            signature.is_verified
              ? "bg-gold/10 text-gold hover:bg-gold/20"
              : "bg-offwhite/5 text-offwhite/40 hover:bg-offwhite/10"
          }`}
        >
          {signature.is_verified ? "Verified" : "Unverified"}
        </button>
      ),
    },
    {
      key: "verified_at",
      header: "Verified At",
      render: (signature) => (
        <span className="text-offwhite/60">{new Date(signature.verified_at).toLocaleDateString()}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (signature) => (
        <button
          type="button"
          onClick={() => handleDelete(signature.unique_id)}
          disabled={deletingId === signature.unique_id}
          className="text-xs font-medium uppercase tracking-wide text-terracotta hover:underline disabled:opacity-50"
        >
          {deletingId === signature.unique_id ? "Deleting…" : "Delete"}
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <h2 className="mb-4 font-serif text-xl text-offwhite">Assign Signature</h2>
        {artworksWithoutSignature.length === 0 && !isLoading ? (
          <p className="text-sm text-offwhite/50">
            Every artwork already has a signature record.
          </p>
        ) : (
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                id="artwork"
                label="Artwork"
                value={selectedArtworkId}
                onChange={(e) => setSelectedArtworkId(e.target.value)}
                required
              >
                <option value="">Select an artwork…</option>
                {artworksWithoutSignature.map((artwork) => (
                  <option key={artwork.artwork_id} value={artwork.artwork_id}>
                    {artwork.title} ({artwork.artwork_id})
                  </option>
                ))}
              </Select>
              <MediaInput
                label="Signature Image"
                mediaType="image"
                folder="tetra-art/signatures"
                value={signatureImage}
                onChange={setSignatureImage}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" className="text-xs" disabled={isCreating}>
                {isCreating ? "Saving…" : "Assign Signature"}
              </Button>
            </div>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
      </Card>

      <DataTable
        columns={columns}
        data={signatures}
        keyExtractor={(signature) => signature.unique_id}
        isLoading={isLoading}
        emptyTitle="No signatures yet"
        emptyMessage="Assign a signature to an artwork to get started."
      />
    </div>
  );
}
