"use client";

import { useRef, useState } from "react";
import Input from "@/components/ui/Input";
import { getUploadSignature } from "@/lib/api/uploads";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useAuth } from "@/lib/auth/AuthContext";

type MediaInputProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  mediaType: "image" | "video";
  folder?: string;
};

export default function MediaInput({ label, value, onChange, mediaType, folder }: MediaInputProps) {
  const { accessToken } = useAuth();
  const [mode, setMode] = useState<"link" | "upload">("link");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !accessToken) return;

    setError(null);
    setIsUploading(true);
    try {
      const signature = await getUploadSignature(folder ?? `tetra-art/${mediaType}s`, accessToken);
      const url = await uploadToCloudinary(file, signature);
      onChange(url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-sand">{label}</span>
        <div className="flex gap-1 rounded-full border border-offwhite/15 p-1 text-xs">
          <button
            type="button"
            onClick={() => setMode("link")}
            className={`rounded-full px-3 py-1 transition-colors duration-300 ${
              mode === "link" ? "bg-gold text-charcoal" : "text-offwhite/60 hover:text-offwhite"
            }`}
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-full px-3 py-1 transition-colors duration-300 ${
              mode === "upload" ? "bg-gold text-charcoal" : "text-offwhite/60 hover:text-offwhite"
            }`}
          >
            Upload
          </button>
        </div>
      </div>

      {mode === "link" ? (
        <Input
          placeholder="https://…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={mediaType === "image" ? "image/*" : "video/*"}
            onChange={handleFileChange}
            disabled={isUploading}
            className="rounded-lg border border-offwhite/15 bg-charcoal-soft px-4 py-2.5 text-sm text-offwhite file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-1.5 file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-charcoal disabled:opacity-50"
          />
          {isUploading && <span className="text-xs text-offwhite/50">Uploading…</span>}
        </div>
      )}

      {error && <span className="text-xs text-terracotta">{error}</span>}

      {value && (
        <div className="overflow-hidden rounded-lg border border-offwhite/10">
          {mediaType === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-40 w-full object-cover" />
          ) : (
            <video src={value} controls className="h-40 w-full object-cover" />
          )}
        </div>
      )}
    </div>
  );
}
