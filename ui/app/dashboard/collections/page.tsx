"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CollectionForm from "@/components/dashboard/CollectionForm";
import EmptyState from "@/components/site/EmptyState";
import {
  createCollection,
  deleteCollection,
  getCollections,
  updateCollection,
} from "@/lib/api/collections";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Collection, CollectionInput } from "@/lib/api/types";

export default function CollectionsPage() {
  const { accessToken } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  function refresh() {
    return getCollections().then(setCollections);
  }

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, []);

  async function handleCreate(data: CollectionInput) {
    if (!accessToken) return;
    await createCollection(data, accessToken);
    await refresh();
    setShowNewForm(false);
  }

  async function handleUpdate(slug: string, data: CollectionInput) {
    if (!accessToken) return;
    await updateCollection(slug, data, accessToken);
    await refresh();
    setEditingSlug(null);
  }

  async function handleDelete(slug: string) {
    if (!accessToken) return;
    if (!window.confirm("Delete this collection? Artworks will keep their other data but lose this grouping."))
      return;

    setDeletingSlug(slug);
    try {
      await deleteCollection(slug, accessToken);
      await refresh();
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-offwhite/50">
          {isLoading ? "Loading…" : `${collections.length} collections`}
        </p>
        <Button
          variant="primary"
          className="text-xs"
          onClick={() => setShowNewForm((prev) => !prev)}
        >
          {showNewForm ? "Cancel" : "New Collection"}
        </Button>
      </div>

      {showNewForm && (
        <Card>
          <h2 className="mb-4 font-serif text-xl text-offwhite">New Collection</h2>
          <CollectionForm
            onSubmit={handleCreate}
            onCancel={() => setShowNewForm(false)}
            submitLabel="Create Collection"
          />
        </Card>
      )}

      {isLoading ? (
        <p className="text-sm text-offwhite/50">Loading…</p>
      ) : collections.length === 0 ? (
        <EmptyState
          title="No collections yet"
          message="Group related artworks into a collection to feature them together."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Card key={collection.slug} className={editingSlug === collection.slug ? "flex flex-col gap-4" : "flex flex-col gap-4 p-0"}>
              {editingSlug === collection.slug ? (
                <>
                  <h3 className="font-serif text-xl text-offwhite">Edit Collection</h3>
                  <CollectionForm
                    initialValues={collection}
                    onSubmit={(data) => handleUpdate(collection.slug, data)}
                    onCancel={() => setEditingSlug(null)}
                    submitLabel="Save"
                  />
                </>
              ) : (
                <>
                  <div className="h-36 w-full overflow-hidden rounded-t-2xl border-b border-offwhite/10 bg-charcoal">
                    {collection.cover_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={collection.cover_image} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
                  <div>
                    <h3 className="font-serif text-xl text-offwhite">{collection.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-offwhite/40">
                      {collection.artworks_count} artworks
                    </p>
                  </div>
                  {collection.description && (
                    <p className="text-sm text-offwhite/60">{collection.description}</p>
                  )}
                  <div className="mt-auto flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingSlug(collection.slug)}
                      className="text-xs font-medium uppercase tracking-wide text-gold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(collection.slug)}
                      disabled={deletingSlug === collection.slug}
                      className="text-xs font-medium uppercase tracking-wide text-terracotta hover:underline disabled:opacity-50"
                    >
                      {deletingSlug === collection.slug ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
