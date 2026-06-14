"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
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

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <h2 className="mb-4 font-serif text-xl text-offwhite">Assign Signature</h2>
        {artworksWithoutSignature.length === 0 && !isLoading ? (
          <p className="text-sm text-offwhite/50">
            Every artwork already has a signature record.
          </p>
        ) : (
          <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
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
            <Input
              id="signature_image"
              label="Signature Image URL"
              placeholder="https://…"
              value={signatureImage}
              onChange={(e) => setSignatureImage(e.target.value)}
            />
            <Button type="submit" variant="primary" className="text-xs" disabled={isCreating}>
              {isCreating ? "Saving…" : "Assign Signature"}
            </Button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
      </Card>

      {isLoading ? (
        <p className="text-sm text-offwhite/50">Loading…</p>
      ) : signatures.length === 0 ? (
        <Card>
          <p className="text-sm text-offwhite/50">No signatures yet.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-offwhite/10 text-xs uppercase tracking-wide text-sand">
                <th className="px-6 py-4 font-medium">Artwork</th>
                <th className="px-6 py-4 font-medium">Signature</th>
                <th className="px-6 py-4 font-medium">Verified</th>
                <th className="px-6 py-4 font-medium">Verified At</th>
                <th className="px-6 py-4 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-offwhite/5">
              {signatures.map((signature) => (
                <tr key={signature.unique_id}>
                  <td className="px-6 py-4">
                    <p className="font-serif text-base text-offwhite">
                      {signature.artwork_detail.title}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-offwhite/40">
                      {signature.artwork}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {signature.signature_image ? (
                      <a
                        href={signature.signature_image}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gold hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-offwhite/40">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleVerified(signature)}
                      disabled={updatingId === signature.unique_id}
                      className={`text-xs font-medium uppercase tracking-wide hover:underline disabled:opacity-50 ${
                        signature.is_verified ? "text-gold" : "text-offwhite/40"
                      }`}
                    >
                      {signature.is_verified ? "Verified" : "Unverified"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-offwhite/60">
                    {new Date(signature.verified_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(signature.unique_id)}
                      disabled={deletingId === signature.unique_id}
                      className="text-xs font-medium uppercase tracking-wide text-terracotta hover:underline disabled:opacity-50"
                    >
                      {deletingId === signature.unique_id ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
