"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { getCollections } from "@/lib/api/collections";
import { ApiError } from "@/lib/api/client";
import type { Artwork, ArtworkInput, Collection } from "@/lib/api/types";

const AVAILABILITY_OPTIONS: Artwork["availability"][] = [
  "available",
  "sold",
  "not_for_sale",
];

const emptyForm: ArtworkInput = {
  title: "",
  medium: "",
  year: new Date().getFullYear(),
  dimensions: "",
  collection: null,
  description: "",
  story: "",
  origin: "",
  creation_time: "",
  availability: "available",
  image: "",
  video: "",
  is_verified: false,
};

type ArtworkFormProps = {
  initialValues?: Artwork;
  onSubmit: (data: ArtworkInput) => Promise<void>;
  submitLabel: string;
};

export default function ArtworkForm({ initialValues, onSubmit, submitLabel }: ArtworkFormProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [form, setForm] = useState<ArtworkInput>(
    initialValues
      ? {
          title: initialValues.title,
          medium: initialValues.medium,
          year: initialValues.year,
          dimensions: initialValues.dimensions,
          collection: initialValues.collection,
          description: initialValues.description,
          story: initialValues.story,
          origin: initialValues.origin,
          creation_time: initialValues.creation_time,
          availability: initialValues.availability,
          image: initialValues.image,
          video: initialValues.video,
          is_verified: initialValues.is_verified,
        }
      : emptyForm
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCollections().then(setCollections).catch(() => setCollections([]));
  }, []);

  function update<K extends keyof ArtworkInput>(key: K, value: ArtworkInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Card className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="title"
          label="Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
        <Input
          id="medium"
          label="Medium"
          placeholder="e.g. Acrylic on Canvas"
          value={form.medium}
          onChange={(e) => update("medium", e.target.value)}
          required
        />
        <Input
          id="year"
          label="Year"
          type="number"
          value={form.year ?? ""}
          onChange={(e) => update("year", Number(e.target.value))}
          required
        />
        <Input
          id="dimensions"
          label="Dimensions"
          placeholder="e.g. 120cm x 90cm"
          value={form.dimensions ?? ""}
          onChange={(e) => update("dimensions", e.target.value)}
        />
        <Input
          id="origin"
          label="Origin"
          placeholder="e.g. Kenya"
          value={form.origin ?? ""}
          onChange={(e) => update("origin", e.target.value)}
        />
        <Input
          id="creation_time"
          label="Creation Time"
          placeholder="e.g. 3 Weeks"
          value={form.creation_time ?? ""}
          onChange={(e) => update("creation_time", e.target.value)}
        />
        <Select
          id="collection"
          label="Collection"
          value={form.collection ?? ""}
          onChange={(e) => update("collection", e.target.value || null)}
        >
          <option value="">No collection</option>
          {collections.map((collection) => (
            <option key={collection.slug} value={collection.slug}>
              {collection.name}
            </option>
          ))}
        </Select>
        <Select
          id="availability"
          label="Availability"
          value={form.availability}
          onChange={(e) => update("availability", e.target.value as Artwork["availability"])}
        >
          {AVAILABILITY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.replace(/_/g, " ")}
            </option>
          ))}
        </Select>
      </Card>

      <Card className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="image"
          label="Image URL"
          placeholder="https://…"
          value={form.image ?? ""}
          onChange={(e) => update("image", e.target.value)}
        />
        <Input
          id="video"
          label="Video URL"
          placeholder="https://…"
          value={form.video ?? ""}
          onChange={(e) => update("video", e.target.value)}
        />
      </Card>

      <Card className="flex flex-col gap-4">
        <Textarea
          id="description"
          label="Description"
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
        />
        <Textarea
          id="story"
          label="Story"
          hint="The story behind the piece — inspiration and meaning."
          value={form.story ?? ""}
          onChange={(e) => update("story", e.target.value)}
        />
        <label className="flex items-center gap-3 text-sm text-offwhite/80">
          <input
            type="checkbox"
            checked={form.is_verified ?? false}
            onChange={(e) => update("is_verified", e.target.checked)}
            className="h-4 w-4 rounded border-offwhite/30 bg-charcoal-soft accent-gold"
          />
          Mark as verified
        </label>
      </Card>

      {error && (
        <p className="text-sm text-terracotta" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
