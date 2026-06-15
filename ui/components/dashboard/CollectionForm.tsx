"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MediaInput from "@/components/dashboard/MediaInput";
import Textarea from "@/components/ui/Textarea";
import { ApiError } from "@/lib/api/client";
import type { Collection, CollectionInput } from "@/lib/api/types";

type CollectionFormProps = {
  initialValues?: Collection;
  onSubmit: (data: CollectionInput) => Promise<void>;
  onCancel?: () => void;
  submitLabel: string;
};

export default function CollectionForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: CollectionFormProps) {
  const [form, setForm] = useState<CollectionInput>({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    cover_image: initialValues?.cover_image ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof CollectionInput>(key: K, value: CollectionInput[K]) {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="name"
        label="Name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        required
      />
      <Textarea
        id="description"
        label="Description"
        value={form.description ?? ""}
        onChange={(e) => update("description", e.target.value)}
      />
      <MediaInput
        label="Cover Image"
        mediaType="image"
        folder="tetra-art/collections"
        value={form.cover_image ?? ""}
        onChange={(url) => update("cover_image", url)}
      />

      {error && (
        <p className="text-sm text-terracotta" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" className="text-xs" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" className="text-xs" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
