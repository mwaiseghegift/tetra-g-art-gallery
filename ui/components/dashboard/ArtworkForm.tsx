"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import MediaInput from "@/components/dashboard/MediaInput";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { getCollections } from "@/lib/api/collections";
import { ApiError } from "@/lib/api/client";
import type {
  Artwork,
  ArtworkGalleryImageInput,
  ArtworkInput,
  ArtworkSectionInput,
  ArtworkSymbolismEntryInput,
  Collection,
} from "@/lib/api/types";

const AVAILABILITY_OPTIONS: Artwork["availability"][] = [
  "available",
  "sold",
  "not_for_sale",
];

const emptyForm: ArtworkInput = {
  title: "",
  subtitle: "",
  medium: "",
  year: new Date().getFullYear(),
  dimensions: "",
  edition: "",
  materials: "",
  framing: "",
  collection: null,
  description: "",
  story: "",
  artist_statement: "",
  origin: "",
  creation_time: "",
  availability: "available",
  image: "",
  video: "",
  is_verified: false,
  sections: [],
  symbolism_entries: [],
  gallery_images: [],
};

const emptySection: ArtworkSectionInput = { heading: "", body: "", order: 0 };
const emptySymbolismEntry: ArtworkSymbolismEntryInput = {
  label: "",
  meaning: "",
  swatch: "",
  order: 0,
};
const emptyGalleryImage: ArtworkGalleryImageInput = { image: "", caption: "", order: 0 };

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
          subtitle: initialValues.subtitle,
          medium: initialValues.medium,
          year: initialValues.year,
          dimensions: initialValues.dimensions,
          edition: initialValues.edition,
          materials: initialValues.materials,
          framing: initialValues.framing,
          collection: initialValues.collection,
          description: initialValues.description,
          story: initialValues.story,
          artist_statement: initialValues.artist_statement,
          origin: initialValues.origin,
          creation_time: initialValues.creation_time,
          availability: initialValues.availability,
          image: initialValues.image,
          video: initialValues.video,
          is_verified: initialValues.is_verified,
          sections: initialValues.sections.map(({ heading, body, order }) => ({
            heading,
            body,
            order,
          })),
          symbolism_entries: initialValues.symbolism_entries.map(
            ({ label, meaning, swatch, order }) => ({ label, meaning, swatch, order })
          ),
          gallery_images: initialValues.gallery_images.map(({ image, caption, order }) => ({
            image,
            caption,
            order,
          })),
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

  function addListItem<K extends "sections" | "symbolism_entries" | "gallery_images">(
    key: K,
    item: NonNullable<ArtworkInput[K]>[number]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), { ...item, order: (prev[key]?.length ?? 0) }],
    }));
  }

  function updateListItem<K extends "sections" | "symbolism_entries" | "gallery_images">(
    key: K,
    index: number,
    patch: Partial<NonNullable<ArtworkInput[K]>[number]>
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  }

  function removeListItem<K extends "sections" | "symbolism_entries" | "gallery_images">(
    key: K,
    index: number
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((_, i) => i !== index),
    }));
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
          id="subtitle"
          label="Subtitle"
          placeholder="e.g. A Sculptural Portrait in Denim Zippers & Brass"
          value={form.subtitle ?? ""}
          onChange={(e) => update("subtitle", e.target.value)}
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
        <Input
          id="edition"
          label="Edition"
          placeholder="e.g. Original Work · One of One"
          value={form.edition ?? ""}
          onChange={(e) => update("edition", e.target.value)}
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
        <MediaInput
          label="Image"
          mediaType="image"
          value={form.image ?? ""}
          onChange={(url) => update("image", url)}
        />
        <MediaInput
          label="Video"
          mediaType="video"
          value={form.video ?? ""}
          onChange={(url) => update("video", url)}
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
        <Textarea
          id="materials"
          label="Materials"
          hint="Fuller materials breakdown, e.g. Denim zippers on board, Mvule wood frame, Polished brass Coat of Arms"
          value={form.materials ?? ""}
          onChange={(e) => update("materials", e.target.value)}
        />
        <Textarea
          id="framing"
          label="Framing"
          hint="Frame/finish description"
          value={form.framing ?? ""}
          onChange={(e) => update("framing", e.target.value)}
        />
        <Textarea
          id="artist_statement"
          label="Artist's Statement"
          hint="A pull-quote from the artist about this piece."
          value={form.artist_statement ?? ""}
          onChange={(e) => update("artist_statement", e.target.value)}
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

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-offwhite">Story Sections</h3>
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 text-xs"
            onClick={() => addListItem("sections", emptySection)}
          >
            Add Section
          </Button>
        </div>
        {(form.sections ?? []).map((section, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-offwhite/10 p-4"
          >
            <Input
              label="Heading"
              placeholder="e.g. THE MEDIUM"
              value={section.heading}
              onChange={(e) => updateListItem("sections", index, { heading: e.target.value })}
            />
            <Textarea
              label="Body"
              value={section.body}
              onChange={(e) => updateListItem("sections", index, { body: e.target.value })}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 text-xs"
                onClick={() => removeListItem("sections", index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-offwhite">Colour &amp; Symbolism</h3>
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 text-xs"
            onClick={() => addListItem("symbolism_entries", emptySymbolismEntry)}
          >
            Add Entry
          </Button>
        </div>
        {(form.symbolism_entries ?? []).map((entry, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 rounded-lg border border-offwhite/10 p-4 sm:grid-cols-[1fr_2fr_auto_auto]"
          >
            <Input
              label="Colour"
              placeholder="e.g. Solar Yellow"
              value={entry.label}
              onChange={(e) => updateListItem("symbolism_entries", index, { label: e.target.value })}
            />
            <Input
              label="Meaning"
              placeholder="e.g. Energy, optimism, forward momentum"
              value={entry.meaning}
              onChange={(e) => updateListItem("symbolism_entries", index, { meaning: e.target.value })}
            />
            <Input
              label="Swatch"
              type="color"
              value={entry.swatch || "#000000"}
              onChange={(e) => updateListItem("symbolism_entries", index, { swatch: e.target.value })}
              className="h-10 p-1"
            />
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 text-xs"
                onClick={() => removeListItem("symbolism_entries", index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-offwhite">Gallery Images</h3>
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 text-xs"
            onClick={() => addListItem("gallery_images", emptyGalleryImage)}
          >
            Add Image
          </Button>
        </div>
        {(form.gallery_images ?? []).map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-offwhite/10 p-4"
          >
            <MediaInput
              label="Image"
              mediaType="image"
              value={item.image}
              onChange={(url) => updateListItem("gallery_images", index, { image: url })}
            />
            <Input
              label="Caption"
              placeholder="e.g. Detail · Polished brass Coat of Arms on mvule frame"
              value={item.caption}
              onChange={(e) => updateListItem("gallery_images", index, { caption: e.target.value })}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 text-xs"
                onClick={() => removeListItem("gallery_images", index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
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
