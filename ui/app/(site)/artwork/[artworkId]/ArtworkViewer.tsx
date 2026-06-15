"use client";

import { useState } from "react";
import { ExpandIcon, HeartIcon, PlayIcon, ShareIcon } from "@/components/ui/Icons";
import type { Artwork } from "@/lib/api/types";
import { artworkImageAlt } from "@/lib/seo/schema";

type ArtworkViewerProps = {
  artwork: Artwork;
};

export default function ArtworkViewer({ artwork }: ArtworkViewerProps) {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title: artwork.title, url });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="relative">
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-offwhite/10 bg-charcoal-soft lg:aspect-square">
        {artwork.image ? (
          <img
            src={artwork.image}
            alt={artworkImageAlt(artwork)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-charcoal-soft via-charcoal to-charcoal-soft">
            <span className="font-serif text-6xl italic text-offwhite/15">
              {artwork.title.slice(0, 1)}
            </span>
          </div>
        )}

        {artwork.video && (
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            aria-label="Watch time-lapse video"
            className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 hover:bg-charcoal/30"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-charcoal/70 text-gold backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <PlayIcon className="h-6 w-6" />
            </span>
          </button>
        )}

        {/* Action icons */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            aria-label="Like artwork"
            aria-pressed={liked}
            className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 ${
              liked
                ? "border-terracotta bg-terracotta text-offwhite"
                : "border-offwhite/20 bg-charcoal/60 text-offwhite hover:border-gold hover:text-gold"
            }`}
          >
            <HeartIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share artwork"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 bg-charcoal/60 text-offwhite backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Expand artwork"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 bg-charcoal/60 text-offwhite backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <ExpandIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-offwhite/50">
        <span>{artwork.views_count} Views</span>
        <span>{artwork.likes_count + (liked ? 1 : 0)} Likes</span>
      </div>

      {expanded && artwork.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-6"
          onClick={() => setExpanded(false)}
        >
          <img
            src={artwork.image}
            alt={artworkImageAlt(artwork)}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 text-offwhite hover:border-gold hover:text-gold"
          >
            ✕
          </button>
        </div>
      )}

      {showVideo && artwork.video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-6"
          onClick={() => setShowVideo(false)}
        >
          <video
            src={artwork.video}
            controls
            autoPlay
            className="max-h-full max-w-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setShowVideo(false)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 text-offwhite hover:border-gold hover:text-gold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
